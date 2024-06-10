---
tags:
- AnimationScheduling
- Curve
---

# ∿ WAV Curve
## Documentation
- Class name: `WAV Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The WAV Curve node dynamically generates animation curves based on the amplitude of audio data from a WAV file, allowing animations to be synchronized with audio. It scales the amplitude value for a given frame, providing both float and integer outputs for versatile use in animation scripting.
## Input types
### Required
- **`frame_counter`**
    - The frame counter is essential for determining the current point in the animation timeline, affecting which part of the WAV file's amplitude is used to generate the curve.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`wav_path`**
    - Specifies the path to the WAV file whose audio data is used to generate the animation curve. A default path is provided, but can be customized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`scale`**
    - A multiplier for the amplitude value extracted from the WAV file, allowing for adjustment of the animation curve's intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The scaled amplitude value from the WAV file as a floating-point number, suitable for precise animation adjustments.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - The scaled amplitude value from the WAV file, rounded to the nearest integer, for discrete animation steps.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamWavCurve:
    NODE_NAME = "WAV Curve"
    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"
    ICON = "∿"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "wav_path": ("STRING", {"default": "audio.wav"}),
                "scale": ("FLOAT", {"default": 1.0, "multiline": False})
            },
        }

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, wav_path, scale):
        if not os.path.isfile(wav_path):
            return (0.0, 0)
        data = _wav_loader(wav_path, frame_counter.frames_per_second)
        frame_counter.current_time_in_seconds
        v = data.value_at_time(frame_counter.current_time_in_seconds)
        return (v * scale, round(v * scale))

```
