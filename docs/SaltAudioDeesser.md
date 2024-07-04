
# Documentation
- Class name: SaltAudioDeesser
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioDeesser节点旨在通过去齿音处理来减少音频录音中的齿音。它根据用户定义的参数（如强度、数量和保留频率）应用特定的音频滤波器，以减弱通常在人声音轨中发现的齿音辅音的强度。

# Input types
## Required
- audio
    - 待处理的原始音频数据。这个输入对于去齿音操作至关重要，因为它是齿音减少的目标。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- intensity
    - 定义去齿音效果的阈值水平，控制齿音减少的激烈程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amount
    - 指定应用于音频的齿音减少量，影响去齿音效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frequency_keep
    - 确定从去齿音处理中保留的频率范围，确保重要的音频特征得以维持。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过去齿音操作处理后的音频数据，齿音已减少。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioDeesser:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "intensity": ("FLOAT", {"default": 0.125, "min": 0.0, "max": 1.0}),
                "amount": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0}),
                "frequency_keep": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_deesser"
    CATEGORY = "SALT/Audio/Effect"

    def apply_deesser(cls, audio, intensity, amount, frequency_keep):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input, \
                 tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_output:

                temp_input.write(audio)
                temp_input.flush()

                command = [
                    'ffmpeg', '-y', '-i', temp_input.name,
                    '-af', f'deesser=i={intensity}:m={amount}:f={frequency_keep}:s=o',
                    temp_output.name
                ]

                subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                temp_output.flush()

            with open(temp_output.name, 'rb') as f:
                processed_audio = f.read()

        finally:
            # Retry mechanism for deletion
            def safe_delete(file_path):
                for attempt in range(3):
                    try:
                        os.unlink(file_path)
                        break
                    except PermissionError:
                        time.sleep(0.1)

            safe_delete(temp_input.name)
            safe_delete(temp_output.name)

        return (processed_audio, )

```
