
# Documentation
- Class name: SaltAudioPitchShift
- Category: SALT/Audio/Effect
- Output node: False

该节点通过指定的半音数对输入音频应用音高偏移,从而实现音频操纵,可以调整声音的感知音高而不改变播放速度。

# Input types
## Required
- audio
    - 待进行音高偏移的音频输入。它是进行音高偏移处理的主要内容。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- semitones
    - 对输入音频进行音高偏移的半音数。正值会提高音高,负值则会降低音高。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 应用音高偏移后的输出音频,其音高已按指定的半音数进行了调整。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
