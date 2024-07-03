
# Documentation
- Class name: SaltScheduledPerlinPowerFractalNoise
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在生成复杂且具有视觉吸引力的噪声图案，利用Perlin噪声算法。它巧妙地调度和修改Perlin噪声参数，随时间或跨帧产生动态的、类分形的视觉效果，可用于音频可视化或其他图形应用。

# Input types
## Required
- batch_size
    - 指定在单个批次中生成的噪声图案数量，影响节点的输出量和并行处理效率。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 决定生成的噪声图案的宽度，直接影响输出的空间分辨率和宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 设置生成的噪声图案的高度，影响输出的空间分辨率和宽高比。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- scale_schedule
    - 一个调度表，用于调整不同帧或实例间噪声图案的尺度，允许动态改变噪声的视觉复杂度和细节。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- octaves_schedule
    - 控制噪声生成过程中使用的倍频程数量，影响结果图案的细节水平和整体复杂度。
    - Comfy dtype: LIST
    - Python dtype: List[int]
- persistence_schedule
    - 跨帧调整持续性参数，影响噪声倍频程的振幅，从而影响图案的视觉对比度。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- lacunarity_schedule
    - 随时间修改空隙度参数，影响噪声细节的频率，有助于输出的分形状外观。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- exponent_schedule
    - 指数参数的调度表，影响噪声图案的强度和对比度，允许对视觉输出进行微妙调整。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- seed_schedule
    - 决定噪声生成的种子值，确保在不同实例或帧之间产生的图案具有可变性和唯一性。
    - Comfy dtype: LIST
    - Python dtype: List[int]
- clamp_min_schedule
    - 设置噪声输出的最小钳位值，使能够控制噪声强度的下限，确保图案视觉范围的一致性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- clamp_max_schedule
    - 定义噪声输出的最大钳位值，允许控制噪声强度的上限，确保图案视觉范围的一致性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
- device
    - 指定执行噪声生成过程的计算设备（CPU或GPU），影响性能和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- images
    - 生成的噪声图案作为张量，可供进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- batch_size
    - 生成的噪声图案数量，对应输入的批量大小。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledPerlinPowerFractalNoise:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_size": ("INT", {"min": 1, "max": 4096}),
                "width": ("INT", {"default": 256, "min": 64, "max": MAX_RESOLUTION}),
                "height": ("INT", {"default": 256, "min": 64, "max": MAX_RESOLUTION}),
            },
            "optional": {
                "scale_schedule": ("LIST",),
                "octaves_schedule": ("LIST",),
                "persistence_schedule": ("LIST",),
                "lacunarity_schedule": ("LIST",),
                "exponent_schedule": ("LIST",),
                "seed_schedule": ("LIST",),
                "clamp_min_schedule": ("LIST",),
                "clamp_max_schedule": ("LIST",),
                "device": (["cuda", "cpu"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("images", "batch_size")

    FUNCTION = "generate"
    CATEGORY = "SALT/Scheduling/Image"

    def generate(self, batch_size, width, height, scale_schedule=[1.0], octaves_schedule=[4], persistence_schedule=[0.5], lacunarity_schedule=[2.0], exponent_schedule=[1.0], seed_schedule=[0], clamp_min_schedule=[-0.5], clamp_max_schedule=[1.5], device="cuda"):
        octaves_schedule = [int(octave) for octave in octaves_schedule]
        ppfn = PerlinPowerFractalNoise(
            width, height, 
            scale=scale_schedule, 
            octaves=octaves_schedule, 
            persistence=persistence_schedule, 
            lacunarity=lacunarity_schedule, 
            exponent=exponent_schedule, 
            seeds=seed_schedule, 
            clamp_min=clamp_min_schedule, 
            clamp_max=clamp_max_schedule, 
            batch_size=batch_size, 
            device=device
        )
        noise_tensor = ppfn.forward()
        return (noise_tensor, batch_size)

```
