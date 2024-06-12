---
tags:
- Audio
---

# Audio Simple Echo
## Documentation
- Class name: `SaltAudioSimpleEcho`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioSimpleEcho node applies an echo effect to an audio input, allowing for customization of the number of echoes, the delay between them, and the decay factor of each subsequent echo. This node enhances audio tracks by adding depth and spatial effects through controlled repetition.
## Input types
### Required
- **`audio`**
    - The primary audio input to which the echo effect will be applied. It serves as the base for generating echoes.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`times`**
    - Specifies the number of times the echo effect is applied, influencing the richness and complexity of the resulting audio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`delay_ms`**
    - The delay in milliseconds between each echo, determining the temporal spacing of the echoes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`decay_factor`**
    - Controls the reduction in volume of each subsequent echo, affecting the fade-out effect over time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The modified audio output with the applied echo effect, showcasing the depth and spatial enhancements.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioSimpleEcho:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "times": ("INT", {"default": 3, "min": 1, "max": 10}),
                "delay_ms": ("INT", {"default": 100, "min": 100, "max": 2000}),
                "decay_factor": ("FLOAT", {"default": 0.4, "min": 0.1, "max": 0.9, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_echo"
    CATEGORY = "SALT/Audio/Effect"

    def apply_echo(self, audio, times, delay_ms, decay_factor):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        silence = AudioSegment.silent(duration=delay_ms)
        echo = original
        fade_duration = int(delay_ms * 0.1)
        speed_increase_factor = 1.01
        speed_increase_step = 0.01

        for i in range(1, times):
            decayed = original - (decay_factor * 10 * i)
            playback_speed = speed_increase_factor + (speed_increase_step * i)
            decayed = decayed.speedup(playback_speed=playback_speed)
            for j in range(1, 5):
                decayed = decayed.overlay(silence + decayed - (5 * j), position=50 * j)
            decayed_with_fades = decayed.fade_in(fade_duration).fade_out(fade_duration)
            echo = echo.overlay(silence + decayed_with_fades, position=delay_ms * i)

        return (get_buffer(echo),)

```
