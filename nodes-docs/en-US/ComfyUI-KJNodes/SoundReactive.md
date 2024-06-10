---
tags:
- Audio
---

# SoundReactive
## Documentation
- Class name: `SoundReactive`
- Category: `KJNodes/audio`
- Output node: `False`

The SoundReactive node is designed to process audio input, adjusting its behavior based on the sound level. It dynamically reacts to variations in sound intensity within a specified frequency range, offering customization through parameters like sound level, frequency range, and normalization. This node is particularly useful for creating audio-reactive visualizations or effects in real-time applications.
## Input types
### Required
- **`sound_level`**
    - Specifies the current sound level to be processed. It influences the node's output by scaling according to the multiplier and normalization settings, directly affecting the dynamic response to audio input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_range_hz`**
    - Defines the lower bound of the frequency range of interest. This parameter helps in focusing the node's sensitivity to a specific part of the audio spectrum.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_range_hz`**
    - Sets the upper limit of the frequency range to be considered. It complements the start_range_hz to fine-tune the node's reactivity to the desired frequency band.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Applies a scaling factor to the sound level, allowing for enhanced control over the node's responsiveness to audio input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`smoothing_factor`**
    - Determines the degree of smoothing applied to the sound level, aiding in the creation of smoother transitions and effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`normalize`**
    - Enables or disables normalization of the sound level, which can standardize the input range for consistent processing across different audio sources.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`sound_level`**
    - Comfy dtype: `FLOAT`
    - The processed sound level, adjusted according to the node's parameters. It reflects the dynamic changes in audio intensity after scaling and optional normalization.
    - Python dtype: `float`
- **`sound_level_int`**
    - Comfy dtype: `INT`
    - An integer representation of the processed sound level, providing a simplified or quantized output for scenarios where discrete levels are preferred.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SoundReactive:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {  
            "sound_level": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 99999, "step": 0.01}),
            "start_range_hz": ("INT", {"default": 150, "min": 0, "max": 9999, "step": 1}),
            "end_range_hz": ("INT", {"default": 2000, "min": 0, "max": 9999, "step": 1}),
            "multiplier": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 99999, "step": 0.01}),
            "smoothing_factor": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            "normalize": ("BOOLEAN", {"default": False}),
            },
            }
    
    RETURN_TYPES = ("FLOAT","INT",)
    RETURN_NAMES =("sound_level", "sound_level_int",)
    FUNCTION = "react"
    CATEGORY = "KJNodes/audio"
    DESCRIPTION = """
Reacts to the sound level of the input.  
Uses your browsers sound input options and requires.  
Meant to be used with realtime diffusion with autoqueue.
"""
        
    def react(self, sound_level, start_range_hz, end_range_hz, smoothing_factor, multiplier, normalize):

        sound_level *= multiplier

        if normalize:
            sound_level /= 255

        sound_level_int = int(sound_level)
        return (sound_level, sound_level_int, )     

```
