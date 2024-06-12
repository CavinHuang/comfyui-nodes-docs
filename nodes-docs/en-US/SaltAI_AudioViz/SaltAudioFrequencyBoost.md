---
tags:
- Audio
---

# Audio Frequency Boost
## Documentation
- Class name: `SaltAudioFrequencyBoost`
- Category: `SALT/Audio/Effect`
- Output node: `False`

This node is designed to enhance the audio experience by selectively boosting the frequency of an audio signal. It allows for precise adjustments to the audio's frequency spectrum, enhancing specific frequency bands to achieve desired audio characteristics.
## Input types
### Required
- **`audio`**
    - The raw audio data to be processed. This input is crucial for defining the audio content that will undergo frequency enhancement.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`frequency`**
    - Specifies the center frequency to boost, allowing for targeted enhancement within the audio spectrum.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bandwidth`**
    - Defines the width of the frequency band around the center frequency that will be boosted, determining the range of frequencies affected.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`gain_dB`**
    - The amount of gain to apply to the specified frequency band, measured in decibels (dB), which controls the intensity of the boost.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The audio data after the frequency boost has been applied, reflecting the enhancements made to the specified frequency band.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFrequencyBoost:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "frequency": ("INT", {"min": 20, "max": 20000, "default": 1000}), 
                "bandwidth": ("FLOAT", {"default": 2.0}),
                "gain_dB": ("FLOAT", {"min": -60, "max": 60, "default": 0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "boost_frequency"
    CATEGORY = "SALT/Audio/Effect"

    def boost_frequency(self, audio, frequency, bandwidth, gain_dB):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input:
            temp_input.write(audio)
            temp_input_path = temp_input.name

        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        
        eq_filter = f"equalizer=f={frequency}:width_type=o:width={bandwidth}:g={gain_dB}"
        command = [ffmpeg_path, "-y", "-i", temp_input_path, "-af", eq_filter, temp_output_path]

        try:
            subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            with open(temp_output_path, "rb") as temp_output:
                modified_audio_data = temp_output.read()
                
            os.unlink(temp_input_path)
            os.unlink(temp_output_path)
                
            return (modified_audio_data,)
        except subprocess.CalledProcessError as e:
            print(f"Failed to apply frequency boost with FFmpeg: {e}")
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)
            if os.path.exists(temp_output_path):
                os.unlink(temp_output_path)
            return (audio,)

```
