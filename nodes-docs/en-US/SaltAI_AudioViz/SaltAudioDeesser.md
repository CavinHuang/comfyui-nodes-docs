---
tags:
- Audio
---

# Audio De-esser
## Documentation
- Class name: `SaltAudioDeesser`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioDeesser node is designed to reduce sibilance in audio recordings through a de-essing process. It applies a specific audio filter to attenuate the intensity of sibilant consonants, typically found in vocal tracks, based on user-defined parameters such as intensity, amount, and frequency to keep.
## Input types
### Required
- **`audio`**
    - The raw audio data to be processed. This input is crucial for the de-essing operation, as it is the target for sibilance reduction.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`intensity`**
    - Defines the threshold level for the de-essing effect, controlling how aggressively the sibilance is reduced.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`amount`**
    - Specifies the amount of sibilance reduction applied to the audio, affecting the intensity of the de-essing effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency_keep`**
    - Determines the frequency range to be preserved from the de-essing process, ensuring important audio characteristics are maintained.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The processed audio data with reduced sibilance, resulting from the de-essing operation.
    - Python dtype: `bytes`
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
