# Replace Camera Parameters 🎭🅐🅓②
## Documentation
- Class name: ADE_ReplaceCameraParameters
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在修改动画或图像处理管道中的摄像机控制参数，允许根据预定义或动态生成的标准调整摄像机姿势。此功能对于实现特定的视觉效果、视角或需要特定摄像机方向或运动的动画至关重要。

## Input types
### Required
- poses
    - 表示要修改的摄像机姿势的参数。它在确定最终输出中起着关键作用，通过指定初始摄像机位置和方向来进行调整。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]
- fx
    - 摄像机在x轴上的焦距。调整此参数会影响摄像机沿x轴的视野，从而影响渲染场景的视角和比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fy
    - 摄像机在y轴上的焦距。与“fx”类似，此参数修改沿y轴的视野，影响场景的深度和高度感知。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cx
    - 摄像机光学中心的x坐标。改变此值会水平移动场景的中心点，可用于校正或实现某些视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cy
    - 摄像机光学中心的y坐标。此参数垂直移动场景的中心点，允许调整垂直对齐或模拟摄像机倾斜效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 应用新的摄像机参数后的修改摄像机姿势。此输出对于依赖更新摄像机方向的渲染或进一步处理的下游过程至关重要。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlReplaceCameraParameters:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "poses":("CAMERACTRL_POSES",),
                "fx": ("FLOAT", {"default": CAM.DEFAULT_FX, "min": 0, "max": 1, "step": 0.000000001}),
                "fy": ("FLOAT", {"default": CAM.DEFAULT_FY, "min": 0, "max": 1, "step": 0.000000001}),
                "cx": ("FLOAT", {"default": CAM.DEFAULT_CX, "min": 0, "max": 1, "step": 0.01}),
                "cy": ("FLOAT", {"default": CAM.DEFAULT_CY, "min": 0, "max": 1, "step": 0.01}),
            },
        }
    
    RETURN_TYPES = ("CAMERACTRL_POSES",)
    FUNCTION = "set_camera_parameters"
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"

    def set_camera_parameters(self, poses: list[list[float]], fx: float, fy: float, cx: float, cy: float):
        new_poses = copy.deepcopy(poses)
        for pose in new_poses:
            # fx,fy,cx,fy are in indexes 1-4 of the 19-long pose list
            pose[1] = fx
            pose[2] = fy
            pose[3] = cx
            pose[4] = cy
        return (new_poses,)