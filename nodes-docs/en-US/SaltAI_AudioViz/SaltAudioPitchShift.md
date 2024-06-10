---
tags:
- Audio
---

# Audio Pitch Shift
## Documentation
- Class name: `SaltAudioPitchShift`
- Category: `SALT/Audio/Effect`
- Output node: `False`

This node applies a pitch shift to an audio input by a specified number of semitones, allowing for audio manipulation that can adjust the perceived pitch of the sound without altering the playback speed.
## Input types
### Required
- **`audio`**
    - The audio input to be pitch-shifted. It is the primary content that undergoes the pitch shift process.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`semitones`**
    - The number of semitones to shift the pitch of the audio input. Positive values raise the pitch, while negative values lower it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The output audio after applying the pitch shift, with its pitch adjusted by the specified number of semitones.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioPitchShift:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "semitones": ("FLOAT", {"default": 0.0, "min": -12.0, "max": 12.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "shift_pitch"
    CATEGORY = "SALT/Audio/Effect"

    def shift_pitch(cls, audio, semitones):
        TEMP = tempfile.gettempdir()
        os.makedirs(TEMP, exist_ok=True)

        temp_input_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)

        with open(temp_input_path, 'wb') as f:
            f.write(audio)

        command = [
            'ffmpeg', '-y', '-i', temp_input_path,
            '-af', f'asetrate=44100*2^({semitones}/12),aresample=44100',
            temp_output_path
        ]

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error during pitch shifting: {e}")
            os.remove(temp_input_path)
            if os.path.exists(temp_output_path):
                os.remove(temp_output_path)
            raise

        with open(temp_output_path, 'rb') as f:
            pitch_shifted_audio = f.read()

        os.remove(temp_input_path)
        os.remove(temp_output_path)

        return (pitch_shifted_audio,)

```
