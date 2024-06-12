---
tags:
- Blur
- VisualEffects
---

# Blur (mtb)
## Documentation
- Class name: `Blur (mtb)`
- Category: `mtb/image processing`
- Output node: `False`

The Blur node applies a Gaussian blur to an image, allowing for both uniform and variable blurring across the image. This process can be used to reduce image noise and detail, simulating the effect of shooting in a lower resolution or with a softer focus lens.
## Input types
### Required
- **`image`**
    - The input image to be blurred. This is the primary data upon which the blur effect is applied, serving as the foundation for the operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sigmaX`**
    - Specifies the standard deviation in the x-direction for the Gaussian kernel. This parameter controls the amount of blur horizontally.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigmaY`**
    - Specifies the standard deviation in the y-direction for the Gaussian kernel. This parameter controls the amount of blur vertically.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`sigmasX`**
    - An optional list of standard deviations in the x-direction for applying variable blur across different parts of the image.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
- **`sigmasY`**
    - An optional list of standard deviations in the y-direction for applying variable blur across different parts of the image.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the Gaussian blur. This image will have reduced noise and detail, with a softer appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_Blur:
    """Blur an image using a Gaussian filter."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "sigmaX": (
                    "FLOAT",
                    {"default": 3.0, "min": 0.0, "max": 200.0, "step": 0.01},
                ),
                "sigmaY": (
                    "FLOAT",
                    {"default": 3.0, "min": 0.0, "max": 200.0, "step": 0.01},
                ),
            },
            "optional": {"sigmasX": ("FLOATS",), "sigmasY": ("FLOATS",)},
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blur"
    CATEGORY = "mtb/image processing"

    def blur(
        self, image: torch.Tensor, sigmaX, sigmaY, sigmasX=None, sigmasY=None
    ):
        image_np = image.numpy() * 255

        blurred_images = []
        if sigmasX is not None:
            if sigmasY is None:
                sigmasY = sigmasX
            if len(sigmasX) != image.size(0):
                raise ValueError(
                    f"SigmasX must have same length as image, sigmasX is {len(sigmasX)} but the batch size is {image.size(0)}"
                )

            for i in range(image.size(0)):
                blurred = gaussian(
                    image_np[i],
                    sigma=(sigmasX[i], sigmasY[i], 0),
                    channel_axis=2,
                )
                blurred_images.append(blurred)

            image_np = np.array(blurred_images)
        else:
            for i in range(image.size(0)):
                blurred = gaussian(
                    image_np[i], sigma=(sigmaX, sigmaY, 0), channel_axis=2
                )
                blurred_images.append(blurred)

            image_np = np.array(blurred_images)
        return (np2tensor(image_np).squeeze(0),)

```
