---
tags:
- Audio
---

# Load Audio
## Documentation
- Class name: `SaltLoadAudio`
- Category: `SALT/Audio`
- Output node: `False`

This node is designed to load audio files into the system, preparing them for further processing or analysis. It serves as the initial step in the audio handling pipeline, enabling subsequent nodes to manipulate or analyze the loaded audio data.
## Input types
### Required
- **`file_path`**
    - Specifies the path to the audio file to be loaded. It is essential for locating and accessing the audio data for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_seconds`**
    - Defines the starting point in seconds from which the audio will be loaded. This allows for partial loading of audio files, facilitating focused analysis or manipulation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`manual_bpm`**
    - Allows for the manual specification of beats per minute (BPM), which can be used to override automatic BPM detection. This is useful for audio processing that relies on precise tempo information.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_rate`**
    - Sets the frame rate for the audio processing. This parameter influences the temporal resolution of the audio analysis and manipulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`duration_seconds`**
    - Determines the duration in seconds for which the audio will be loaded from the start point. This enables selective processing of audio segments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The loaded audio data, ready for further processing or analysis.
    - Python dtype: `bytes`
- **`bpm`**
    - Comfy dtype: `FLOAT`
    - The detected or manually specified beats per minute (BPM) of the loaded audio.
    - Python dtype: `float`
- **`frame_rate`**
    - Comfy dtype: `INT`
    - The frame rate used during the audio loading process.
    - Python dtype: `int`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total number of frames in the loaded audio segment, calculated based on the duration and frame rate.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltLoadAudio:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_path": ("STRING", {}),
                "start_seconds": ("FLOAT", {"min": 0.0, "default": 0.0}),
                "manual_bpm": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 300.0}),
                "frame_rate": ("INT", {"default": 8, "min": 1, "max": 244}),
            },
            "optional": {
                "duration_seconds": ("FLOAT", {"min": 0.0, "default": 0.0, "optional": True}),
            },
        }

    RETURN_TYPES = ("AUDIO", "FLOAT", "INT", "INT")
    RETURN_NAMES = ("audio", "bpm", "frame_rate", "frame_count")
    FUNCTION = "load_audio"
    CATEGORY = "SALT/Audio"

    def load_audio(self, file_path, start_seconds, duration_seconds=0.0, manual_bpm=0.0, frame_rate=24.0):
        INPUT = folder_paths.get_input_directory()
        file_path = os.path.join(INPUT, file_path)

        # Load the audio segment (by start/duration)
        audio = self.get_audio(file_path, start_seconds, duration_seconds)
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        audio_segment = audio_segment.set_frame_rate(frame_rate)
        duration_ms = int(duration_seconds * 1000) if duration_seconds else len(audio_segment) - int(start_seconds * 1000)

        bpm = self.analyze_bpm(audio, manual_bpm)
        frame_count = int((duration_ms / 1000.0) * frame_rate)

        return (audio, bpm, frame_rate, frame_count)

    def get_audio(self, file, start_time=0, duration=0):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)
        
        temp_file_path = None
        try:
            # Create a temporary file in the specified directory
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False, dir=TEMP) as temp_file:
                temp_file_path = temp_file.name
            
            args = [ffmpeg_path, "-y", "-v", "error", "-i", file, "-acodec", "pcm_s16le", "-ar", "44100"]
            if start_time > 0:
                args += ["-ss", str(start_time)]
            if duration > 0:
                args += ["-t", str(duration)]
            args += [temp_file_path]

            subprocess.run(args, check=True)

            with open(temp_file_path, "rb") as f:
                audio_data = f.read()

            return audio_data
        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
    
    def analyze_bpm(self, audio_bytes, manual_bpm=0.0):
        with io.BytesIO(audio_bytes) as audio_file:
            y, sr = librosa.load(audio_file, sr=None)

        if manual_bpm <= 0:
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            bpm = tempo
        else:
            bpm = manual_bpm

        return round(bpm, ndigits=2)

    @staticmethod
    def calculate_file_hash(filename: str):
        try:
            h = hashlib.sha256()
            h.update(filename.encode())
            h.update(str(os.path.getmtime(filename)).encode())
            return h.hexdigest()
        except Exception as e:
            print(e)
            return float("NaN")

    @classmethod
    def IS_CHANGED(cls, file_path, *args, **kwargs):
        INPUT = folder_paths.get_input_directory()
        file_path = os.path.join(INPUT, file_path)
        hash = cls.calculate_file_hash(file_path)
        return hash

```
