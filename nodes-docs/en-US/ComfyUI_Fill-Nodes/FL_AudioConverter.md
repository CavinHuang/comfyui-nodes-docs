---
tags:
- Audio
---

# FL VHS Audio Converter
## Documentation
- Class name: `FL_AudioConverter`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_AudioConverter node is designed to transform audio data into a format that simulates the characteristics of VHS audio quality. It processes audio inputs by adjusting their sample rate and converting them into a byte stream that represents the audio in a VHS-like quality.
## Input types
### Required
- **`audio`**
    - The 'audio' input represents the raw audio data that will be processed and converted into VHS audio quality. It is crucial for defining the audio content that will undergo transformation.
    - Comfy dtype: `AUDIO`
    - Python dtype: `Tuple[np.ndarray, int]`
- **`sample_rate`**
    - The 'sample_rate' input specifies the sample rate of the audio data. It plays a significant role in the conversion process by determining the resolution of the audio output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`audio`**
    - Comfy dtype: `VHS_AUDIO`
    - The output is a lambda function that, when called, returns the audio data bytes simulating VHS audio quality.
    - Python dtype: `Callable[[], bytes]`
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
