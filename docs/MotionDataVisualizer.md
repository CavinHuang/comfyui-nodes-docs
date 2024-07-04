
# Documentation
- Class name: MotionDataVisualizer
- Category: MotionDiff
- Output node: False

MotionDataVisualizer节点旨在将运动数据转化为可视化表示，通过距离、高度和旋转等各种参数来实现运动的可视化。它支持不同的可视化风格，并将可视化后的运动输出为一系列张量帧。

# Input types
## Required
- motion_data
    - 需要可视化的运动数据，可以包括关节信息或需要从运动格式转换为关节。这个输入至关重要，因为它通过确定要可视化的运动结构和动态直接影响视觉输出。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, Any]
- visualization
    - 指定应用于运动数据的可视化风格，影响输出的视觉外观和可解释性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- distance
    - 距离参数控制可视化中相机与运动的距离，影响可视化运动的比例和透视效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- elevation
    - 高度参数调整可视化的相机仰角，影响运动的垂直角度和整体视图。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotation
    - 旋转参数设置可视化中相机围绕运动的旋转角度，影响可视化运动的方向和角度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- poselinewidth
    - 定义可视化中姿势表示的线宽，影响运动姿势的清晰度和视觉突出性。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- opt_title
    - 可视化的可选标题，可以增强上下文或为可视化运动提供额外信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 以图像形式输出的可视化运动。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionDataVisualizer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_data": ("MOTION_DATA", ),
                "visualization": (["original", "pseudo-openpose"], {"default": "pseudo-openpose"}),
                "distance": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                "elevation": ("FLOAT", {"default": 120, "min": 0.0, "max": 300.0, "step": 0.1}),
                "rotation": ("FLOAT", {"default": -90, "min": -180, "max": 180, "step": 1}),
                "poselinewidth": ("FLOAT", {"default": 4, "min": 0, "max": 50, "step": 0.1}),
            },
            "optional": {
                "opt_title": ("STRING", {"default": '' ,"multiline": False}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "MotionDiff"
    FUNCTION = "visualize"

    def visualize(self, motion_data, visualization, distance, elevation, rotation, poselinewidth, opt_title=None):
        if "joints" in motion_data:
            joints = motion_data["joints"]
        else:
            joints = motion_data_to_joints(motion_data["motion"])
        pil_frames = plot_3d_motion(
            None, t2m_kinematic_chain, joints, distance, elevation, rotation, poselinewidth,
            title=opt_title if opt_title is not None else '',
            fps=1,  save_as_pil_lists=True, visualization=visualization
        )
        tensor_frames = []
        for pil_image in pil_frames:
            np_image = np.array(pil_image.convert("RGB")).astype(np.float32) / 255.0
            tensor_frames.append(torch.from_numpy(np_image))
        return (torch.stack(tensor_frames, dim=0), )

```
