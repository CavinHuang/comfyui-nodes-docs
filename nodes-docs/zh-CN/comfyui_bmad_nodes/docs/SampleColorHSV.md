
# Documentation
- Class name: SampleColorHSV
- Category: Bmad/CV/Color A.
- Output node: False

SampleColorHSV节点旨在从RGB图像中抽样像素并将这些样本转换为HSV颜色空间。它通过提供HSV格式的图像颜色分布代表性子集，来促进图像内色彩信息的分析和操作。

# Input types
## Required
- rgb_image
    - 将被抽样的RGB图像。这是生成HSV格式的颜色信息子集的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- sample_size
    - 决定从RGB图像中抽样的像素数量。更大的样本量能提供更具代表性的图像颜色分布子集。
    - Comfy dtype: INT
    - Python dtype: int
- sampling_seed
    - 用于抽样像素的随机数生成器的种子值。这确保了在不同运行中抽样子集的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- hsv_samples
    - 输出是一组从RGB转换为HSV颜色空间的抽样像素，为进一步的颜色分析或操作提供基础。
    - Comfy dtype: HSV_SAMPLES
    - Python dtype: tuple


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SampleColorHSV:
    @classmethod
    def INPUT_TYPES(s):
        import sys
        return {"required": {
            "rgb_image": ("IMAGE",),
            "sample_size": ("INT", {"default": 1000, "min": 1, "max": 256 * 256, }),
            "sampling_seed": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1})
        }}

    RETURN_TYPES = ("HSV_SAMPLES",)
    FUNCTION = "sample"
    CATEGORY = "Bmad/CV/Color A."

    def sample(self, rgb_image, sample_size, sampling_seed):
        image = tensor2opencv(rgb_image, 3)
        image_width = image.shape[1]

        # sample pixels
        np.random.seed(sampling_seed)
        random_indices = np.random.choice(image.shape[0] * image_width, sample_size, replace=False)
        sample_pixels = np.array([image[i // image_width, i % image_width] for i in random_indices])
        sample_pixels = sample_pixels.reshape((1, -1, 3))

        # only convert samples to HSV
        sample_pixels_hsv = cv.cvtColor(sample_pixels, cv.COLOR_RGB2HSV)
        samples_object = HSV_Samples(sample_pixels_hsv[0, :, :])
        return (samples_object,)

```
