"use client";

import { Trash, Upload, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEventHandler, MouseEventHandler, MutableRefObject, useRef, useState } from "react";

interface VideoInputProps {}

export function VideoInput({}: VideoInputProps) {
  const [video, setVideo] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadLocalFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    console.log(file);

    setVideo(file);
  };

  const clearVideo: MouseEventHandler<HTMLSpanElement> = () => {
    if (inputRef.current) inputRef.current.value = "";
    setVideo(null);
  };

  const [recording, setRecording] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const mediaRecorderRef = useRef<MediaRecorder>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  // const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const mediaRecorderRef: MutableRefObject<MediaRecorder | null> = useRef(null);
  // const recordedChunksRef: MutableRefObject<Blob[]> = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setRecording(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="testimonialVideo">Video</Label>

        <div className="flex items-center gap-2">
          <div>
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
              // disabled={!!video}
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Load video
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {!!video && (
            <Button size={"icon"} variant={"ghost"} onClick={clearVideo}>
              <Trash size={16} />
            </Button>
          )}
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
        <video ref={videoRef} autoPlay playsInline></video>
        <div>
          {!recording ? (
            <button onClick={startRecording}>Start Recording</button>
          ) : (
            <button onClick={stopRecording}>Stop Recording</button>
          )}
        </div>

        {videoURL && (
          <div>
            <h3>Recorded Video:</h3>
            <video src={videoURL} controls></video>
          </div>
        )}
      </div>
    </div>
  );
}
