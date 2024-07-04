
# Documentation
- Class name: SaltAudioNoiseReductionSpectralSubtraction
- Category: SALT/Audio/Effect
- Output node: False

该节点应用基于谱减法的噪声降低技术处理音频输入，有效降低背景噪音并增强音频清晰度。

# Input types
## Required
- audio
    - 需要进行降噪处理的原始音频数据。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- noise_floor
    - 控制降噪阈值的参数，影响从音频中去除噪音的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过降噪处理后的音频数据。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioNoiseReductionSpectralSubtraction:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "noise_floor": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "reduce_noise_spectral"
    CATEGORY = "SALT/Audio/Effect"

    def reduce_noise_spectral(cls, audio, noise_floor):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        temp_input_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)

        with open(temp_input_path, 'wb') as f:
            f.write(audio)

        command = [
            ffmpeg_path, '-y', '-i', temp_input_path,
            '-af', f'afftdn=nr={noise_floor * 100}',
            temp_output_path
        ]

        subprocess.run(command, check=True)

        with open(temp_output_path, 'rb') as f:
            noise_reduced_audio = f.read()

        os.remove(temp_input_path)
        os.remove(temp_output_path)

        return (noise_reduced_audio,)

```
