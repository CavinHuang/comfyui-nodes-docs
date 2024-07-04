
# Documentation
- Class name: KMeansColor
- Category: Bmad/CV/Color A.
- Output node: False

KMeansColor节点旨在对图像应用K-means聚类算法，将其色彩调色板简化为指定数量的颜色。这一过程对于色彩量化非常有用，可以在保留图像基本视觉特征的同时减少图像中的颜色数量。

# Input types
## Required
- image
    - 要处理的输入图像。它是色彩量化的基础，决定了最终简化后的色彩调色板。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- number_of_colors
    - 指定简化后调色板中所需的颜色数量。它直接影响色彩量化过程的结果。
    - Comfy dtype: INT
    - Python dtype: int
- max_iterations
    - K-means算法收敛到解决方案所允许的最大迭代次数。它影响算法的运行时间和精确度。
    - Comfy dtype: INT
    - Python dtype: int
- eps
    - 收敛标准的epsilon值。较小的值使算法更精确，但可能增加计算时间。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 处理后的图像，其色彩调色板已简化为指定数量的颜色。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
