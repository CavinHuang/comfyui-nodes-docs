
# Documentation
- Class name: FL_AudioConverter
- Category: 🏵️Fill Nodes
- Output node: False

FL_AudioConverter节点旨在将音频数据转换成模拟VHS音频质量特征的格式。它通过调整输入音频的采样率并将其转换为代表VHS类似音质的字节流来处理音频输入。

# Input types
## Required
- audio
    - audio输入代表将被处理并转换成VHS音频质量的原始音频数据。它对定义将要进行转换的音频内容至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: Tuple[np.ndarray, int]
- sample_rate
    - sample_rate输入指定音频数据的采样率。它在转换过程中起着重要作用，决定了音频输出的分辨率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- audio
    - 输出是一个lambda函数，调用时返回模拟VHS音频质量的音频数据字节。
    - Comfy dtype: VHS_AUDIO
    - Python dtype: Callable[[], bytes]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_AudioConverter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO",),
                "sample_rate": ("INT", {"default": 44100, "description": "Sample rate of the audio"}),
            }
        }

    RETURN_TYPES = ("VHS_AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "convert_audio"
    CATEGORY = "🏵️Fill Nodes"

    def convert_audio(self, audio, sample_rate):
        # Extract the audio data and sample rate from the input tuple
        audio_data, _ = audio

        # Convert the audio data to int16
        audio_data = (audio_data * 32767).astype(np.int16)

        # Create a bytes buffer
        buffer = io.BytesIO()

        # Write the audio data to the buffer using wave module
        with wave.open(buffer, 'wb') as wav_file:
            wav_file.setnchannels(1)  # Mono audio
            wav_file.setsampwidth(2)  # 2 bytes per sample (int16)
            wav_file.setframerate(sample_rate)
            wav_file.writeframes(audio_data.tobytes())

        # Get the bytes from the buffer
        audio_bytes = buffer.getvalue()

        # Return a lambda function that returns the audio bytes
        return (lambda: audio_bytes,)

```
