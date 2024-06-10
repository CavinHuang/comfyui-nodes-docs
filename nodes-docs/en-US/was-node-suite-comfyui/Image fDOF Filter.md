---
tags:
- ImageFilter
- VisualEffects
---

# Image fDOF Filter
## Documentation
- Class name: `Image fDOF Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node focuses on applying a field of depth effect to images, simulating the depth-of-field effect often seen in photography. This effect can make a subject stand out by blurring the background or foreground in relation to the subject's focus distance.
## Input types
### Required
- **`image`**
    - The input image to which the field of depth effect will be applied. This parameter is crucial for determining the areas of focus and blur within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`depth`**
    - Specifies the depth information for each part of the image, used to calculate the blur intensity in relation to the subject's focus distance.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Determines the type of blur to be applied, offering options such as 'mock', 'gaussian', and 'box' to simulate different depth-of-field effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`radius`**
    - Controls the radius of the blur effect, affecting the extent of the area that appears out of focus.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`samples`**
    - Defines the number of samples to be used in the blur effect, influencing the quality and intensity of the depth-of-field simulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the field of depth effect applied, showcasing areas of focus and blur based on the specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_fDOF:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "depth": ("IMAGE",),
                "mode": (["mock", "gaussian", "box"],),
                "radius": ("INT", {"default": 8, "min": 1, "max": 128, "step": 1}),
                "samples": ("INT", {"default": 1, "min": 1, "max": 3, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "fdof_composite"

    CATEGORY = "WAS Suite/Image/Filter"

    def fdof_composite(self, image, depth, radius, samples, mode):

        import cv2 as cv

        # Convert tensor to a PIL Image
        tensor_images = []
        for i in range(len(image)):
            if i <= len(image):
                img = tensor2pil(image[i])
            else:
                img = tensor2pil(image[-1])
            if i <= len(depth):
                dpth = tensor2pil(depth[i])
            else:
                dpth = tensor2pil(depth[-1])
            tensor_images.append(pil2tensor(self.portraitBlur(img, dpth, radius, samples, mode)))
        tensor_images = torch.cat(tensor_images, dim=0)

        return (tensor_images, )

    def portraitBlur(self, img, mask, radius, samples, mode='mock'):
        mask = mask.resize(img.size).convert('L')
        bimg: Optional[Image.Image] = None
        if mode == 'mock':
            bimg = medianFilter(img, radius, (radius * 1500), 75)
        elif mode == 'gaussian':
            bimg = img.filter(ImageFilter.GaussianBlur(radius=radius))
        elif mode == 'box':
            bimg = img.filter(ImageFilter.BoxBlur(radius))
        else:
            return
        bimg.convert(img.mode)
        rimg: Optional[Image.Image] = None
        if samples > 1:
            for i in range(samples):
                if not rimg:
                    rimg = Image.composite(img, bimg, mask)
                else:
                    rimg = Image.composite(rimg, bimg, mask)
        else:
            rimg = Image.composite(img, bimg, mask).convert('RGB')

        return rimg

```
