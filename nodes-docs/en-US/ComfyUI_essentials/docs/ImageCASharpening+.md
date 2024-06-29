---
tags:
- ImageEnhancement
- VisualEffects
---

# 🔧 Image Contrast Adaptive Sharpening
## Documentation
- Class name: `ImageCASharpening+`
- Category: `essentials`
- Output node: `False`

The ImageCASharpening+ node applies contrast adaptive sharpening to images, enhancing their clarity and detail by adjusting local contrast. This process is particularly useful for improving the visual quality of images by making them appear more crisp and defined without significantly altering their overall appearance.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be processed. It is crucial for defining the visual content on which the contrast adaptive sharpening will be applied, directly influencing the outcome of the node's operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`amount`**
    - The 'amount' parameter controls the intensity of the contrast adaptive sharpening applied to the image. It plays a key role in determining the strength of the effect, allowing for fine-tuning of the image's sharpness and detail enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output 'image' parameter is the result of applying contrast adaptive sharpening to the input image. It showcases enhanced clarity and detail, reflecting the adjustments made to the local contrast.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageScaleBy](../../Comfy/Nodes/ImageScaleBy.md)
    - [ImpactSimpleDetectorSEGS_for_AD](../../ComfyUI-Impact-Pack/Nodes/ImpactSimpleDetectorSEGS_for_AD.md)



## Source code
```python
class ImageCAS:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "amount": ("FLOAT", {"default": 0.8, "min": 0, "max": 1, "step": 0.05}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "essentials"
    FUNCTION = "execute"

    def execute(self, image, amount):
        img = F.pad(p(image), pad=(1, 1, 1, 1)).cpu()

        a = img[..., :-2, :-2]
        b = img[..., :-2, 1:-1]
        c = img[..., :-2, 2:]
        d = img[..., 1:-1, :-2]
        e = img[..., 1:-1, 1:-1]
        f = img[..., 1:-1, 2:]
        g = img[..., 2:, :-2]
        h = img[..., 2:, 1:-1]
        i = img[..., 2:, 2:]

        # Computing contrast
        cross = (b, d, e, f, h)
        mn = min_(cross)
        mx = max_(cross)

        diag = (a, c, g, i)
        mn2 = min_(diag)
        mx2 = max_(diag)
        mx = mx + mx2
        mn = mn + mn2

        # Computing local weight
        inv_mx = torch.reciprocal(mx + EPSILON)
        amp = inv_mx * torch.minimum(mn, (2 - mx))

        # scaling
        amp = torch.sqrt(amp)
        w = - amp * (amount * (1/5 - 1/8) + 1/8)
        div = torch.reciprocal(1 + 4*w)

        output = ((b + d + f + h)*w + e) * div
        output = output.clamp(0, 1)
        #output = torch.nan_to_num(output)   # this seems the only way to ensure there are no NaNs

        output = pb(output)

        return (output,)

```
