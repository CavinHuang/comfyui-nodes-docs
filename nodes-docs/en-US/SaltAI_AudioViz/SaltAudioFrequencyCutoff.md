---
tags:
- Audio
---

# Audio Frequency Cutoff
## Documentation
- Class name: `SaltAudioFrequencyCutoff`
- Category: `SALT/Audio/Effect`
- Output node: `False`

This node applies a frequency cutoff to an audio file, using FFmpeg to filter out frequencies above or below a specified cutoff point. It's designed to modify the audio's frequency spectrum, either by attenuating frequencies beyond a certain threshold or enhancing the audio within a specific frequency range.
## Input types
### Required
- **`audio`**
    - The raw audio data to be processed. This parameter is crucial as it represents the audio content that will undergo the frequency cutoff operation.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`filter_type`**
    - Specifies the type of filter to apply (e.g., lowpass or highpass), determining whether frequencies above or below the cutoff frequency are attenuated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cutoff_frequency`**
    - The frequency threshold for the filter. Frequencies above or below this value will be attenuated, depending on the filter type.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The modified audio data after applying the frequency cutoff. This output reflects the changes made to the audio's frequency spectrum.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFrequencyCutoff:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "filter_type": (["lowpass", "highpass"], ),
                "cutoff_frequency": ("INT", {"min": 20, "max": 20000, "default": 1000}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_cutoff"
    CATEGORY = "SALT/Audio/Effect"

    def apply_cutoff(self, audio, filter_type, cutoff_frequency):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)

        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav', dir=TEMP) as temp_input:
            temp_input.write(audio)
            temp_input_path = temp_input.name

        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        
        filter_command = f"{filter_type}=f={cutoff_frequency}"
        command = [ffmpeg_path, '-y', "-i", temp_input_path, "-af", filter_command, temp_output_path]

        try:
            subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            with open(temp_output_path, "rb") as temp_output:
                modified_audio_data = temp_output.read()
                
            os.unlink(temp_input_path)
            os.unlink(temp_output_path)
                
            return (modified_audio_data,)
        except subprocess.CalledProcessError as e:
            print(f"Failed to apply frequency cutoff with FFmpeg: {e}")
            if os.path.exists(temp_input_path):
                os.unlink(temp_input_path)
            if os.path.exists(temp_output_path):
                os.unlink(temp_output_path)
            return (audio,)

```
