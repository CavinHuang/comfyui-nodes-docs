
# Documentation
- Class name: SaltScheduledVoronoiNoise
- Category: SALT/Scheduling/Image
- Output node: False

SaltScheduledVoronoiNoise节点用于生成基于Voronoi噪声的视觉模式。它允许随时间调度各种参数，如比例、细节和随机性，从而实现动态和不断演变的视觉效果，可以根据音频或其他时变输入进行定制。

# Input types
## Required
- batch_size
    - 指定一次执行中生成的模式数量，允许批量处理噪声生成。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 决定生成的噪声模式的宽度，影响空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 设置生成的噪声模式的高度，影响垂直分辨率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- distance_metric
    - 定义用于计算Voronoi图中距离的度量，影响单元格的形状和分布。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- x_schedule
    - x轴位置的时间表，实现噪声模式随时间的动态移动或变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- y_schedule
    - y轴位置的时间表，允许噪声模式随时间在垂直方向上移动或变化。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- scale_schedule
    - 控制不同时间点噪声模式的比例，实现缩放效果。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- detail_schedule
    - 随时间调整噪声模式的细节级别，影响复杂度和纹理。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- randomness_schedule
    - 随时间修改噪声模式的随机性，允许改变模式的不可预测性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- seed_schedule
    - 种子值的时间表，实现在不同时间生成不同的噪声模式。
    - Comfy dtype: LIST
    - Python dtype: List[int]
- device
    - 指定执行噪声生成过程的计算设备（CPU或GPU），影响性能和能力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- images
    - 生成的Voronoi噪声模式，以图像批次的形式输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- batch_size
    - 生成的模式数量，确认处理的批次大小。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledVoronoiNoise:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_size": ("INT", {"min": 1, "max": 4096}),
                "width": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION}),
                "height": ("INT", {"default": 64, "min": 64, "max": MAX_RESOLUTION}),
            }, 
            "optional": {
                "distance_metric": (["euclidean", "manhattan", "chebyshev", "minkowski"],),
                "x_schedule": ("LIST",),
                "y_schedule": ("LIST",),
                "scale_schedule": ("LIST",),
                "detail_schedule": ("LIST",),
                "randomness_schedule": ("LIST",),
                "seed_schedule": ("LIST", ),
                "device": (["cuda", "cpu"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("images", "batch_size")

    FUNCTION = "generate"
    CATEGORY = "SALT/Scheduling/Image"

    def generate(self, batch_size, width, height, distance_metric="euclidean", x_schedule=[0], y_schedule=[0], z_schedule=[0], scale_schedule=[1.0], detail_schedule=[100], randomness_schedule=[1], seed_schedule=[0], device="cuda"):
        voronoi = VoronoiNoise(width=width, height=height, scale=scale_schedule, detail=detail_schedule, seed=seed_schedule, 
                            X=x_schedule, Y=y_schedule, 
                            randomness=randomness_schedule, distance_metric=distance_metric, batch_size=batch_size, device=device)
        voronoi = voronoi.to(device)
        tensors = voronoi()
        return(tensors, batch_size)

```
