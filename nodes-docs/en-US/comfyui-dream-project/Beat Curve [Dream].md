---
tags:
- AnimationScheduling
- Curve
---

# 📈 Beat Curve
## Documentation
- Class name: `Beat Curve [Dream]`
- Category: `✨ Dream/🎥 animation/📈 curves`
- Output node: `False`

The Beat Curve node generates animation curves based on musical beats, allowing for synchronization between visual animations and rhythmic elements of a soundtrack. It utilizes BPM (beats per minute), measure length, and optional accents to create dynamic, beat-aligned animations.
## Input types
### Required
- **`frame_counter`**
    - Provides the current frame and timing information necessary for calculating the animation curve in relation to the music's beat.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`bpm`**
    - Specifies the beats per minute of the music track, influencing the timing of the animation curve to match the rhythm.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`time_offset`**
    - Adjusts the start time of the animation curve, allowing for precise synchronization with the music track.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`measure_length`**
    - Defines the length of a musical measure in beats, used to calculate the timing of accents within the animation curve.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`low_value`**
    - Sets the minimum value of the animation curve, defining the lower bound of the generated values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`high_value`**
    - Sets the maximum value of the animation curve, defining the upper bound of the generated values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`invert`**
    - Inverts the animation curve, flipping the generated values between the specified low and high values. This parameter accepts 'yes' or 'no' to indicate inversion.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`power`**
    - Applies a power function to the animation curve, adjusting the intensity and dynamics of the curve's progression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`accent_i`**
    - Specifies an accent beat within a measure, enhancing the animation curve's response to musical rhythm. Accents range from 1 to the measure length, allowing for dynamic rhythm customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point value of the animation curve at the current frame, reflecting the rhythmic pattern.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - The integer-rounded value of the animation curve at the current frame, suitable for discrete animations.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBeatCurve:
    NODE_NAME = "Beat Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "bpm": ("FLOAT", {"default": 100.0, "multiline": False}),
                "time_offset": ("FLOAT", {"default": 0.0, "multiline": False}),
                "measure_length": ("INT", {"default": 4, "min": 1}),
                "low_value": ("FLOAT", {"default": 0.0}),
                "high_value": ("FLOAT", {"default": 1.0}),
                "invert": (["no", "yes"],),
                "power": ("FLOAT", {"default": 2.0, "min": 0.25, "max": 4}),
                "accent_1": ("INT", {"default": 1, "min": 1, "max": 24}),
            },
            "optional": {
                "accent_2": ("INT", {"default": 3, "min": 1, "max": 24}),
                "accent_3": ("INT", {"default": 0}),
                "accent_4": ("INT", {"default": 0}),
            }
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _get_value_for_accent(self, accent, measure_length, bpm, frame_counter: FrameCounter, frame_offset):
        current_frame = frame_counter.current_frame + frame_offset
        frames_per_minute = frame_counter.frames_per_second * 60.0
        frames_per_beat = frames_per_minute / bpm
        frames_per_measure = frames_per_beat * measure_length
        frame = (current_frame % frames_per_measure)
        accent_start = (accent - 1) * frames_per_beat
        accent_end = accent * frames_per_beat
        if frame >= accent_start and frame < accent_end:
            return 1.0 - ((frame - accent_start) / frames_per_beat)
        return 0

    def result(self, bpm, frame_counter: FrameCounter, measure_length, low_value, high_value, power, invert,
               time_offset, **accents):
        frame_offset = int(round(time_offset * frame_counter.frames_per_second))
        accents_set = set(filter(lambda v: v >= 1 and v <= measure_length,
                                 map(lambda i: accents.get("accent_" + str(i), -1), range(30))))
        v = 0.0
        for a in accents_set:
            v += math.pow(self._get_value_for_accent(a, measure_length, bpm, frame_counter, frame_offset), power)
        if invert == "yes":
            v = 1.0 - v

        r = low_value + v * (high_value - low_value)
        return _curve_result(r)

```
