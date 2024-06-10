# Documentation
- Class name: CreateFluidMask
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CreateFluidMask 节点旨在生成流体动画效果，可用于创建动态且视觉上吸引人的遮罩覆盖层。它利用流体动力学的原理来模拟指定分辨率和持续时间内的流入和染料运动，生成一系列图像及其对应的遮罩。

# Input types
## Required
- frames
    - 'frames' 参数决定了要为流体遮罩动画生成的总帧数。它至关重要，因为它决定了动画序列的长度，并通过流体运动影响整体的视觉叙事。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 'width' 参数设置了生成的流体遮罩的宽度，以像素为单位。它是一个重要参数，因为它定义了沿 x 轴的空间分辨率，影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height' 参数指定了生成的流体遮罩的高度，以像素为单位。它在建立输出的垂直分辨率方面起着重要作用，影响动画中可见的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- invert
    - 'invert' 参数允许对生成的遮罩进行反转。当设置为 True 时，它会翻转遮罩，创造出用于同视觉结果的对比效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- inflow_count
    - 'inflow_count' 参数决定了在流体模拟中要考虑的流入点的数量。它影响流体流动的复杂性和分布，有助于整体遮罩的美学。
    - Comfy dtype: INT
    - Python dtype: int
- inflow_velocity
    - 'inflow_velocity' 参数设置了流入点的速度，影响流体在模拟中的移动和分散速度。它是控制流体动画动态的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- inflow_radius
    - 'inflow_radius' 参数定义了每个流入点的影响半径，决定了流入影响的区域。它在塑造流体遮罩的外观中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- inflow_padding
    - 'inflow_padding' 参数在流入点周围添加填充，以防止流体直接撞击遮罩的边缘。它有助于在边界处为流体流动创建更平滑的过渡。
    - Comfy dtype: INT
    - Python dtype: int
- inflow_duration
    - 'inflow_duration' 参数指定了流入在模拟期间将活跃的持续时间。它对于控制动画序列内流体效果的时间至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 'IMAGE' 输出提供了由流体模拟生成的图像序列。每个图像代表动画中的一帧，展示了随时间变化的流体运动和染料分散。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - 'MASK' 输出由与 'IMAGE' 输出中每一帧对应的二进制遮罩组成。这些遮罩描绘了流体存在的区域，为流体和背景之间提供了清晰的区分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateFluidMask:
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'createfluidmask'
    CATEGORY = 'KJNodes/masking/generate'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'invert': ('BOOLEAN', {'default': False}), 'frames': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'width': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'inflow_count': ('INT', {'default': 3, 'min': 0, 'max': 255, 'step': 1}), 'inflow_velocity': ('INT', {'default': 1, 'min': 0, 'max': 255, 'step': 1}), 'inflow_radius': ('INT', {'default': 8, 'min': 0, 'max': 255, 'step': 1}), 'inflow_padding': ('INT', {'default': 50, 'min': 0, 'max': 255, 'step': 1}), 'inflow_duration': ('INT', {'default': 60, 'min': 0, 'max': 255, 'step': 1})}}

    def createfluidmask(self, frames, width, height, invert, inflow_count, inflow_velocity, inflow_radius, inflow_padding, inflow_duration):
        from .fluid import Fluid
        from scipy.spatial import erf
        out = []
        masks = []
        RESOLUTION = (width, height)
        DURATION = frames
        INFLOW_PADDING = inflow_padding
        INFLOW_DURATION = inflow_duration
        INFLOW_RADIUS = inflow_radius
        INFLOW_VELOCITY = inflow_velocity
        INFLOW_COUNT = inflow_count
        print('Generating fluid solver, this may take some time.')
        fluid = Fluid(RESOLUTION, 'dye')
        center = np.floor_divide(RESOLUTION, 2)
        r = np.min(center) - INFLOW_PADDING
        points = np.linspace(-np.pi, np.pi, INFLOW_COUNT, endpoint=False)
        points = tuple((np.array((np.cos(p), np.sin(p))) for p in points))
        normals = tuple((-p for p in points))
        points = tuple((r * p + center for p in points))
        inflow_velocity = np.zeros_like(fluid.velocity)
        inflow_dye = np.zeros(fluid.shape)
        for (p, n) in zip(points, normals):
            mask = np.linalg.norm(fluid.indices - p[:, None, None], axis=0) <= INFLOW_RADIUS
            inflow_velocity[:, mask] += n[:, None] * INFLOW_VELOCITY
            inflow_dye[mask] = 1
        for f in range(DURATION):
            print(f'Computing frame {f + 1} of {DURATION}.')
            if f <= INFLOW_DURATION:
                fluid.velocity += inflow_velocity
                fluid.dye += inflow_dye
            curl = fluid.step()[1]
            curl = (erf(curl * 2) + 1) / 4
            color = np.dstack((curl, np.ones(fluid.shape), fluid.dye))
            color = (np.clip(color, 0, 1) * 255).astype('uint8')
            image = np.array(color).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            mask = image[:, :, :, 0]
            masks.append(mask)
            out.append(image)
        if invert:
            return (1.0 - torch.cat(out, dim=0), 1.0 - torch.cat(masks, dim=0))
        return (torch.cat(out, dim=0), torch.cat(masks, dim=0))
```