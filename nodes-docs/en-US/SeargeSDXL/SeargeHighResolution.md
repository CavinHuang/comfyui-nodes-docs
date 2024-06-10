---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# High Resolution v2
## Documentation
- Class name: `SeargeHighResolution`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeHighResolution node is designed to enhance the resolution and detail of images through a series of upscale and detail enhancement processes. It leverages various scaling techniques, including bicubic and nearest neighbor interpolations, and integrates with model-based upscaling and detail enhancement to achieve high-resolution outputs. This node plays a crucial role in refining image quality, especially in scenarios where higher detail and clarity are desired.
## Input types
### Required
- **`hires_mode`**
    - Specifies the high-resolution mode to be used, influencing the overall approach and techniques applied for image enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hires_scale`**
    - Determines the scaling factor for upscaling the image, directly affecting the final image size and detail level.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`hires_denoise`**
    - Controls the amount of denoising applied during the upscaling process, helping to reduce noise in the upscaled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_softness`**
    - A parameter controlling the blend between different upscaling methods (nearest and bicubic) to achieve a desired softness in the image texture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_detail_boost`**
    - Adjusts the intensity of detail enhancement applied to the upscaled image, allowing for finer control over the clarity and sharpness of details.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_contrast_factor`**
    - Modifies the contrast of the upscaled image, enhancing visual depth and definition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_saturation_factor`**
    - Alters the saturation level of the upscaled image, affecting color intensity and vibrance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_latent_detailer`**
    - An optional model for enhancing the details of the upscaled image at a latent level, further refining image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[torch.nn.Module]`
- **`final_upscale_size`**
    - Specifies the target size for the final upscaled image, determining the overall dimensions of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[int, int]`
### Optional
- **`data`**
    - Optional data that can be passed through for additional processing or information tracking.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Optional[dict]`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The final upscaled and detail-enhanced image data, representing the high-resolution output of the node's processing. This data includes the upscaled image along with any additional information processed through the node.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeargeHighResolution:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "hires_mode": (UI.HIRES_MODES, {"default": UI.NONE},),
                "hires_scale": (UI.HIRES_SCALE_FACTORS, {"default": UI.HIRES_SCALE_1_5},),
                "hires_denoise": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0, "step": 0.01},),
                "hires_softness": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.05},),
                "hires_detail_boost": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "hires_contrast_factor": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "hires_saturation_factor": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "hires_latent_detailer": (UI.LATENT_DETAILERS, {"default": UI.NONE},),
                "final_upscale_size": (UI.UPSCALE_FACTORS, {"default": UI.NONE},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(hires_mode, hires_scale, hires_denoise, hires_softness, hires_detail_boost, hires_contrast_factor,
                    hires_saturation_factor, hires_latent_detailer, final_upscale_size):
        return {
            UI.F_HIRES_MODE: hires_mode,
            UI.F_HIRES_SCALE: hires_scale,
            UI.F_HIRES_DENOISE: round(hires_denoise, 3),
            UI.F_HIRES_SOFTNESS: round(hires_softness, 3),
            UI.F_HIRES_DETAIL_BOOST: round(hires_detail_boost, 3),
            UI.F_HIRES_CONTRAST_FACTOR: round(hires_contrast_factor, 3),
            UI.F_HIRES_SATURATION_FACTOR: round(hires_saturation_factor, 3),
            UI.F_HIRES_LATENT_DETAILER: hires_latent_detailer,
            UI.F_FINAL_UPSCALE_SIZE: final_upscale_size,
        }

    def get(self, hires_mode, hires_scale, hires_denoise, hires_softness, hires_detail_boost, hires_contrast_factor,
            hires_saturation_factor, hires_latent_detailer, final_upscale_size, data=None):
        if data is None:
            data = {}

        data[UI.S_HIGH_RESOLUTION] = self.create_dict(
            hires_mode,
            hires_scale,
            hires_denoise,
            hires_softness,
            hires_detail_boost,
            hires_contrast_factor,
            hires_saturation_factor,
            hires_latent_detailer,
            final_upscale_size,
        )

        return (data,)

```
