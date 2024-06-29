---
tags:
- Color
---

# KMeansColor
## Documentation
- Class name: `KMeansColor`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

The KMeansColor node is designed to apply the K-means clustering algorithm to an image to simplify its color palette to a specified number of colors. This process can be useful for color quantization, reducing the number of colors in an image while preserving its essential visual characteristics.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the basis for color quantization, determining the final simplified color palette.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`number_of_colors`**
    - Specifies the desired number of colors in the simplified palette. It directly influences the outcome of the color quantization process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_iterations`**
    - The maximum number of iterations allowed for the K-means algorithm to converge to a solution. It affects the algorithm's runtime and precision.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`eps`**
    - The epsilon value for convergence criteria. A smaller value makes the algorithm more precise but may increase computation time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with its color palette simplified to the specified number of colors.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KMeansColor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "number_of_colors": ("INT", {"default": 2, "min": 1}),
            "max_iterations": ("INT", {"default": 100}),
            "eps": ("FLOAT", {"default": .2, "step": 0.05})
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "get_colors"
    CATEGORY = "Bmad/CV/Color A."

    def get_colors(self, image, number_of_colors, max_iterations, eps):
        image = tensor2opencv(image, 3)
        pixels = image.reshape(-1, 3)
        pixels = np.float32(pixels)

        # define criteria and apply kmeans
        criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, max_iterations, eps)
        _, labels, centers = cv.kmeans(pixels, number_of_colors, None, criteria, 10, cv.KMEANS_RANDOM_CENTERS)

        # convert back into uint8, and make original image
        center = np.uint8(centers)
        res = center[labels.flatten()]
        res2 = res.reshape((image.shape))
        res2 = opencv2tensor(res2)
        return (res2,)

```
