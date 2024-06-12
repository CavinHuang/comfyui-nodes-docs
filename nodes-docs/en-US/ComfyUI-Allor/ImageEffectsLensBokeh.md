---
tags:
- LensEffects
- VisualEffects
---

# ImageEffectsLensBokeh
## Documentation
- Class name: `ImageEffectsLensBokeh`
- Category: `image/effects/lens`
- Output node: `False`

This node applies a bokeh effect to images, simulating the aesthetic quality of the blur produced in the out-of-focus parts of an image. It leverages parameters related to lens characteristics and blur intensity to create visually appealing effects that mimic the behavior of real camera lenses.
## Input types
### Required
- **`images`**
    - The input images to which the bokeh effect will be applied. This parameter is crucial for defining the base content that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blades_shape`**
    - Defines the shape of the lens through which the bokeh effect is simulated, affecting the overall appearance of the blur.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blades_radius`**
    - Specifies the radius of the lens blades, influencing the size and shape of the bokeh blur.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blades_rotation`**
    - Determines the rotation angle of the lens blades, affecting the orientation of the bokeh blur.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blur_size`**
    - Sets the size of the blur effect, enabling fine-tuning of how pronounced the bokeh effect appears on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blur_type`**
    - Specifies the type of blur to be applied, offering different methods for achieving the bokeh effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`method`**
    - Determines the method used to apply the lens blur, affecting the final appearance of the bokeh effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed image with the applied bokeh effect, showcasing the visual enhancement achieved through the simulation of lens characteristics and blur adjustments.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensBokeh:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "blades_shape": ("INT", {
                    "default": 5,
                    "min": 3,
                }),
                "blades_radius": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
                "blades_rotation": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 360.0,
                }),
                "blur_size": ("INT", {
                    "default": 10,
                    "min": 1,
                    "step": 2
                }),
                "blur_type": (["bilateral", "stack", "none"],),
                "method": (["dilate", "filter"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    # noinspection PyUnresolvedReferences
    def lens_blur(self, image, blades_shape, blades_radius, blades_rotation, method):
        angles = np.linspace(0, 2 * np.pi, blades_shape + 1)[:-1] + blades_rotation * np.pi / 180
        x = blades_radius * np.cos(angles) + blades_radius
        y = blades_radius * np.sin(angles) + blades_radius
        pts = np.stack([x, y], axis=1).astype(np.int32)

        mask = np.zeros((blades_radius * 2 + 1, blades_radius * 2 + 1), np.uint8)
        cv2.fillPoly(mask, [pts], 255)

        gaussian_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])

        if method == "dilate":
            kernel = cv2.filter2D(mask, -1, gaussian_kernel)
            result = cv2.dilate(image, kernel)
        elif method == "filter":
            height, width = image.shape[:2]
            dilate_size = min(height, width) // 512

            if dilate_size > 0:
                image = cv2.dilate(image, np.ones((dilate_size, dilate_size), np.uint8))

            kernel = mask.astype(np.float32) / np.sum(mask)
            kernel = cv2.filter2D(kernel, -1, gaussian_kernel)
            result = cv2.filter2D(image, -1, kernel)
        else:
            raise ValueError("Unsupported method.")

        return result

    def node(self, images, blades_shape, blades_radius, blades_rotation, blur_size, blur_type, method):
        tensor = images.clone().detach()
        blur_size -= 1

        if blur_type == "bilateral":
            tensor = cv2_layer(tensor, lambda x: cv2.bilateralFilter(x, blur_size, -100, 100))
        elif blur_type == "stack":
            tensor = cv2_layer(tensor, lambda x: cv2.stackBlur(x, (blur_size, blur_size)))
        elif blur_type == "none":
            pass
        else:
            raise ValueError("Unsupported blur type.")

        return (cv2_layer(tensor, lambda x: self.lens_blur(
            x, blades_shape, blades_radius, blades_rotation, method
        )),)

```
