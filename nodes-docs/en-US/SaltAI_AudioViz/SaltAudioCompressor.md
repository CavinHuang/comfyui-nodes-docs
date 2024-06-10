---
tags:
- Audio
---

# Audio Compressor
## Documentation
- Class name: `SaltAudioCompressor`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioCompressor node is designed to dynamically reduce the dynamic range of audio signals. It applies compression to make louder sounds quieter and quieter sounds louder, achieving a more consistent overall level.
## Input types
### Required
- **`audio`**
    - The raw audio data to be compressed. This input is crucial for the compression process, affecting the final output by adjusting the dynamic range of the audio.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`threshold_dB`**
    - The threshold level in decibels. Sounds above this level will be compressed. It determines the point at which compression starts, impacting the loudness of the audio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ratio`**
    - The compression ratio, indicating how much the audio that exceeds the threshold will be compressed. It affects the intensity of the compression applied to the audio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`attack_ms`**
    - The attack time in milliseconds. It specifies how quickly the compressor starts to work after the audio exceeds the threshold, affecting the responsiveness of the compression.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`release_ms`**
    - The release time in milliseconds. It defines how quickly the compressor stops affecting the audio after it falls below the threshold, influencing the smoothness of the audio output.
    - Comfy dtype: `INT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The compressed audio data, with reduced dynamic range. This output is the direct result of the compression process applied to the input audio.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioCompressor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "threshold_dB": ("FLOAT", {"default": -20.0, "min": -60.0, "max": 0.0}),
                "ratio": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 20.0}),
                "attack_ms": ("INT", {"default": 50, "min": 0, "max": 1000}),
                "release_ms": ("INT", {"default": 200, "min": 0, "max": 3000}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "compress_audio"
    CATEGORY = "SALT/Audio/Process"

    def compress_audio(self, audio, threshold_dB, ratio, attack_ms, release_ms):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        temp_input_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)

        audio_segment.export(temp_input_path, format="wav")
        points = f"-80/-80|-60/-60|{threshold_dB}/{threshold_dB + (20 / ratio)}|20/20"
        
        command = [
            'ffmpeg', '-y', '-i', temp_input_path,
            '-filter_complex',
            f'compand=attacks={attack_ms / 1000.0}:decays={release_ms / 1000.0}:points={points}',
            temp_output_path
        ]

        subprocess.run(command, check=True)
        
        with open(temp_output_path, 'rb') as f:
            compressed_audio = f.read()

        os.remove(temp_input_path)
        os.remove(temp_output_path)

        return (compressed_audio,)

```
