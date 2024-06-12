---
tags:
- AnimationScheduling
---

# FL Audio Scanner
## Documentation
- Class name: `FL_AudioFrameCalculator`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_AudioFrameCalculator node is designed to process audio files by calculating the number of frames within specified bars of the audio, based on the beats per minute (BPM), frame rate, and other parameters. It utilizes audio processing libraries to extract and manipulate audio data, providing insights into the audio's structure and timing for further processing or analysis.
## Input types
### Required
- **`audio_file_path`**
    - Specifies the absolute path to the audio file to be processed. It is crucial for locating and loading the audio data for analysis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_bar`**
    - Determines the starting bar from which the audio analysis begins, allowing for targeted processing within the audio file.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bar_count`**
    - Defines the number of bars to analyze, enabling the calculation of frames over a specific section of the audio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fps`**
    - Frames per second setting, which influences the calculation of the total number of frames within the specified audio segment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`AUDIO`**
    - Comfy dtype: `AUDIO`
    - The processed audio segment, suitable for further audio manipulation or analysis.
    - Python dtype: `tuple`
- **`Frame Count`**
    - Comfy dtype: `INT`
    - The total number of frames calculated within the specified audio segment.
    - Python dtype: `int`
- **`BPM`**
    - Comfy dtype: `INT`
    - The beats per minute of the audio, determined during processing.
    - Python dtype: `int`
- **`FPS`**
    - Comfy dtype: `INT`
    - The frames per second parameter, as specified in the input, returned for reference.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_AudioFrameCalculator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_file_path": ("STRING", {
                    "default": "/path/to/audio/file/example.wav",
                    "description": "Absolute path to the audio file"
                }),
                "start_bar": ("INT", {
                    "default": 0,
                    "description": "Start bar"
                }),
                "bar_count": ("INT", {
                    "default": 8,
                    "description": "Number of bars"
                }),
                "fps": ("INT", {
                    "default": 10,
                    "description": "Frames per second"
                }),
            }
        }

    RETURN_TYPES = ("AUDIO", "INT", "INT", "INT")
    RETURN_NAMES = ("AUDIO", "Frame Count", "BPM", "FPS")
    FUNCTION = "process_audio"
    CATEGORY = "🏵️Fill Nodes"

    def process_audio(self, audio_file_path, start_bar, bar_count, fps):
        if not os.path.isfile(audio_file_path):
            raise FileNotFoundError(f"Audio file does not exist: {audio_file_path}")

        waveform, sample_rate = torchaudio.load(audio_file_path)

        y_full = waveform.numpy()[0]  # Assuming mono audio for simplicity
        tempo, _ = librosa.beat.beat_track(y=y_full, sr=sample_rate)
        bpm = int(tempo)

        # Calculate the duration of a single bar in seconds (4 beats per bar)
        bar_duration = 60 / bpm * 4

        # Calculate start and end times in seconds based on bars
        start_time = start_bar * bar_duration
        end_time = start_time + (bar_count * bar_duration)

        # Convert times to sample indices
        start_sample = int(start_time * sample_rate)
        end_sample = int(end_time * sample_rate)

        # Extract the selected audio segment
        audio_segment = waveform[:, start_sample:end_sample]

        # Calculate the number of frames based on FPS and segment duration
        duration_seconds = end_time - start_time
        frames_count = int(duration_seconds * fps)

        audio_output = (audio_segment.cpu().numpy(), sample_rate)

        print("-_-_-_-_-_-_-_-_-_-")
        print(f"BPM: {bpm}")
        print(f"Start Time: {start_time}")
        print(f"End Time: {end_time}")
        print(f"Frame Count: {frames_count}")
        print("-_-_-_-_-_-_-_-_-_-")

        return (audio_output, frames_count, bpm, fps)

```
