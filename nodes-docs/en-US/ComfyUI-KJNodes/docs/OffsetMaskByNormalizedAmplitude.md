# OffsetMaskByNormalizedAmplitude
## Documentation
- Class name: `OffsetMaskByNormalizedAmplitude`
- Category: `KJNodes/audio`
- Output node: `False`

This node applies transformations to a mask based on the normalized amplitude of an audio signal. It adjusts the mask's orientation and position, leveraging the amplitude to dictate the degree of rotation and shift, thereby enabling dynamic visual effects synchronized with audio intensity.
## Input types
### Required
- **`normalized_amp`**
    - An array of normalized amplitude values from an audio signal, used to determine the extent of transformation.
    - Comfy dtype: `NORMALIZED_AMPLITUDE`
    - Python dtype: `numpy.ndarray`
- **`mask`**
    - The mask to be transformed, representing a visual element whose modifications are driven by audio amplitude.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`x`**
    - The horizontal shift factor, influencing the mask's lateral movement in response to amplitude changes.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`y`**
    - The vertical shift factor, affecting the mask's vertical displacement as dictated by the amplitude.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`rotate`**
    - A boolean indicating whether the mask should be rotated based on the normalized amplitude.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`angle_multiplier`**
    - A multiplier for the rotation angle, scaling the effect of the normalized amplitude on the mask's rotation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The transformed mask after applying rotation and shift adjustments based on the audio's normalized amplitude.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OffsetMaskByNormalizedAmplitude:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "normalized_amp": ("NORMALIZED_AMPLITUDE",),
                "mask": ("MASK",),
                "x": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "y": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "rotate": ("BOOLEAN", { "default": False }),
                "angle_multiplier": ("FLOAT", { "default": 0.0, "min": -1.0, "max": 1.0, "step": 0.001, "display": "number" }),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "offset"
    CATEGORY = "KJNodes/audio"
    DESCRIPTION = """
Works as a bridge to the AudioScheduler -nodes:  
https://github.com/a1lazydog/ComfyUI-AudioScheduler  
Offsets masks based on the normalized amplitude.
"""

    def offset(self, mask, x, y, angle_multiplier, rotate, normalized_amp):

         # Ensure normalized_amp is an array and within the range [0, 1]
        offsetmask = mask.clone()
        normalized_amp = np.clip(normalized_amp, 0.0, 1.0)
       
        batch_size, height, width = mask.shape

        if rotate:
            for i in range(batch_size):
                rotation_amp = int(normalized_amp[i] * (360 * angle_multiplier))
                rotation_angle = rotation_amp
                offsetmask[i] = TF.rotate(offsetmask[i].unsqueeze(0), rotation_angle).squeeze(0)
        if x != 0 or y != 0:
            for i in range(batch_size):
                offset_amp = normalized_amp[i] * 10
                shift_x = min(x*offset_amp, width-1)
                shift_y = min(y*offset_amp, height-1)
                if shift_x != 0:
                    offsetmask[i] = torch.roll(offsetmask[i], shifts=int(shift_x), dims=1)
                if shift_y != 0:
                    offsetmask[i] = torch.roll(offsetmask[i], shifts=int(shift_y), dims=0)
        
        return offsetmask,

```
