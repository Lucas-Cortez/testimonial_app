"use client";

import { Pause, Play, Trash, Upload, Video, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useTimer } from "react-timer-hook";

interface VideoInputProps {}

const formatToWatchNumber = (value: number) => value.toString().padStart(2, "0");

type Status = {
  recording: boolean;
  capturing: boolean;
  loading: boolean;
};

export function VideoInput({}: VideoInputProps) {
  const [status, setStatus] = useState<Status>({
    recording: false,
    capturing: false,
    loading: false,
  });
  const [video, setVideo] = useState<File | null>(null);
  // const [recording, setRecording] = useState<boolean>(false);
  // const [capturing, setCapturing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { start, restart, seconds, minutes } = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * 10),
    autoStart: false,
    onExpire: () => stopRecording(),
  });

  const dispatchStatus = (newState: Partial<Status>) => setStatus((prev) => ({ ...prev, ...newState }));

  const uploadLocalFile = useCallback<React.ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    setVideo(file);
  }, []);

  const clearVideo = useCallback<React.MouseEventHandler<HTMLSpanElement>>(() => {
    if (inputRef.current) inputRef.current.value = "";
    setVideo(null);
  }, []);

  const startCaptureVideo = useCallback(async () => {
    dispatchStatus({ capturing: true, loading: true });
    // setCapturing(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      dispatchStatus({ loading: false });

      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
      dispatchStatus({ capturing: false });
      // setCapturing(false);
    }
  }, []);

  const stopCaptureVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();

      tracks.forEach((track) => track.stop());

      // setCapturing(false);
      dispatchStatus({ capturing: false });
    }
  }, []);

  const startRecording = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/mp4" });

      let recordedChunksRef: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunksRef.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef, { type: "video/mp4" });
        const file = new File([blob], `video-${Date.now()}-${crypto.randomUUID()}`, {
          lastModified: Date.now(),
        });

        setVideo(file);

        recordedChunksRef = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      start();
      // setRecording(true);
      dispatchStatus({ recording: true });
    }
  }, [start]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      restart(new Date(Date.now() + 1000 * 60 * 5), false);
    }

    stopCaptureVideo();
    // setRecording(false);
    dispatchStatus({ recording: false });
  }, [restart, stopCaptureVideo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => stopCaptureVideo, []);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="testimonialVideo">Video</Label>

        <div className="grid grid-cols-9 gap-2">
          <Button
            variant={"outline"}
            disabled={!!video}
            type="button"
            className="col-span-4"
            onClick={startCaptureVideo}
          >
            Record video
            <Video className="ml-2 h-4 w-4" />
          </Button>

          <>
            <Input
              name="testimonialVideo"
              id="testimonialVideo"
              type="file"
              accept="video/*"
              multiple={false}
              onChange={uploadLocalFile}
              ref={inputRef}
              className="sr-only hidden"
            />
            <Button
              variant={"outline"}
              disabled={!!video}
              type="button"
              className="col-span-4"
              onClick={() => {
                inputRef.current?.click();
                stopCaptureVideo();
              }}
            >
              Load video
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </>

          <Button variant={"ghost"} onClick={clearVideo}>
            <Trash />
          </Button>
        </div>
      </div>

      {!!video && (
        <div className="w-full overflow-hidden rounded-md border-2 border-gray-200">
          <video controls>
            <source src={URL.createObjectURL(video)} type={video.type} />
            Your browser doesn&apos;t support the video element.
          </video>
        </div>
      )}

      <div>
        {status.capturing ? (
          <div className="relative">
            <div className="w-full overflow-hidden rounded-md border-2 border-gray-200">
              <video ref={videoRef} autoPlay muted className="rotate-y-180 h-full" hidden={status.loading} />
              {status.loading ? (
                <div className="flex h-24 w-full items-center justify-center">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-black border-l-transparent"></div>
                </div>
              ) : null}
            </div>

            {status.recording ? (
              <div className="absolute right-4 top-5 flex flex-col items-center text-red-600">
                <div className="h-4 w-4 animate-pulse rounded-full bg-red-600"></div>
                <span>{`${minutes}:${formatToWatchNumber(seconds)}`}</span>
              </div>
            ) : null}

            {!status.loading ? (
              <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <Button
                  onClick={() => (status.recording ? stopRecording() : startRecording())}
                  title={status.recording ? "Stop Recording" : "Start Recording"}
                >
                  {status.recording ? <Pause /> : <Play />}
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
