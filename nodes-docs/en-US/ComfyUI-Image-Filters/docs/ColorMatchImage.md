---
tags:
- Color
---

# Color Match Image
## Documentation
- Class name: `ColorMatchImage`
- Category: `image/filters`
- Output node: `False`

The ColorMatchImage node is designed to adjust the colors of an image to match or harmonize with a target color scheme or another image. This process is essential in image editing and compositing workflows where color consistency across different elements is crucial.
## Input types
### Required
- **`images`**
    - The 'images' input represents the source images that need color adjustment. It is crucial for defining the starting point for the color matching process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`reference`**
    - The 'reference' input specifies the target image or color scheme that the source images should match. It is essential for guiding the color matching process towards the desired outcome.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blur`**
    - The 'blur' input controls the level of blur applied to the reference image, affecting the softness of the color matching.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`factor`**
    - The 'factor' input determines the intensity of the color matching effect, allowing for fine-tuning of the final appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output provides the resulting images after color adjustment, showcasing the effectiveness of the color matching process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ColorMatchImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "reference": ("IMAGE", ),
                "blur": ("INT", {"default": 0, "min": 0, "max": 1023}),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch_normalize"

    CATEGORY = "image/filters"

    def batch_normalize(self, images, reference, blur, factor):
        t = images.detach().clone()
        ref = reference.detach().clone()
        if ref.shape[0] < t.shape[0]:
            ref = ref[0].unsqueeze(0).repeat(t.shape[0], 1, 1, 1)
        
        if blur == 0:
            mean = torch.mean(t, (1,2), keepdim=True)
            mean_ref = torch.mean(ref, (1,2), keepdim=True)
            for i in range(t.shape[0]):
                for c in range(3):
                    t[i,:,:,c] /= mean[i,0,0,c]
                    t[i,:,:,c] *= mean_ref[i,0,0,c]
        else:
            d = blur * 2 + 1
            blurred = cv_blur_tensor(torch.clamp(t, 0.001, 1), d, d)
            blurred_ref = cv_blur_tensor(torch.clamp(ref, 0.001, 1), d, d)
            for i in range(t.shape[0]):
                for c in range(3):
                    t[i,:,:,c] /= blurred[i,:,:,c]
                    t[i,:,:,c] *= blurred_ref[i,:,:,c]
        
        t = torch.lerp(images, t, factor)
        return (t,)

```
