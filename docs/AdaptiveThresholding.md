
# Documentation
- Class name: AdaptiveThresholding
- Category: Bmad/CV/Thresholding
- Output node: False

AdaptiveThresholding节点对图像应用自适应阈值处理技术，根据局部图像特征将灰度图像转换为二值图像。这一过程能够增强不同光照条件下的特征可见性，适用于计算机视觉任务中的图像预处理。

# Input types
## Required
- src
    - 需要进行阈值处理的源图像。它是定义将要应用自适应阈值处理的输入图像的关键参数。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- max_value
    - 阈值处理后像素可以达到的最大强度值。它决定了输出二值图像中白色区域的亮度。
    - Comfy dtype: INT
    - Python dtype: int
- adaptive_method
    - 指定根据像素邻域值计算像素阈值的方法。它影响阈值处理过程的自适应性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- threshold_type
    - 根据与阈值的比较，决定像素值是设为最大值还是零。它影响阈值处理的二值化结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- block_size
    - 用于计算每个像素阈值的邻域区域大小。它影响阈值处理的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- c
    - 从计算得到的均值或加权均值中减去的常数。它通过调整阈值来微调阈值处理过程。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 自适应阈值处理过程产生的二值图像。它通过将图像转换为二值格式来突出显示图像中感兴趣的特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AdaptiveThresholding:
    adaptive_modes_map = {
        "ADAPTIVE_THRESH_MEAN_C": cv.ADAPTIVE_THRESH_MEAN_C,
        "ADAPTIVE_THRESH_GAUSSIAN_C": cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    }
    adaptive_modes = list(adaptive_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "max_value": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                # maybe should just allow for 255? may just confuse some people that don't read documentation
                "adaptive_method": (s.adaptive_modes, {"default": s.adaptive_modes[1]}),
                "threshold_type": (thresh_types, {"default": thresh_types[0]}),
                "block_size": ("INT", {"default": 4, "min": 2, "step": 2}),
                "c": ("INT", {"default": 2, "min": -999, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "thresh"
    CATEGORY = "Bmad/CV/Thresholding"

    def thresh(self, src, max_value, adaptive_method, threshold_type, block_size, c):
        # maybe allow to use from a specific channel 1st? nah, just create a node to fetch the channel
        # might be useful for other nodes
        src = tensor2opencv(src, 1)
        src = cv.adaptiveThreshold(src, max_value, self.adaptive_modes_map[adaptive_method], \
                                   thresh_types_map[threshold_type], block_size + 1, c)
        src = cv.cvtColor(src, cv.COLOR_GRAY2RGB)
        src = opencv2tensor(src)
        return (src,)

```
