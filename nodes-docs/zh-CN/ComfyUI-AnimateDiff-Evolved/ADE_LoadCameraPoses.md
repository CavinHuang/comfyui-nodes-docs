# Load CameraCtrl Poses (File) 🎭🅐🅓②
## Documentation
- Class name: ADE_LoadCameraPoses
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

`ADE_LoadCameraPoses`节点旨在从指定的文件加载摄像机控制姿势，便于在Animate Diff框架内操纵和动画化摄像机位置。它作为创建动态和复杂摄像机运动的基础元素，用于动画序列。

## Input types
### Required
- pose_filename
    - 指定要从中加载摄像机控制姿势的文件名。此文件名应对应包含所需摄像机姿势的文件，使节点能够检索和利用这些姿势进行动画化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- cameractrl_poses
    - Comfy dtype: CAMERACTRL_POSES
    - 输出一系列摄像机控制姿势，这些姿势结构为浮点数列表，表示摄像机在动画上下文中的位置、方向和其他相关参数。
    - Python dtype: list[list[float]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class LoadCameraPoses:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        files = [f for f in files if f.endswith(".txt")]
        return {
            "required": {
                "pose_filename": (sorted(files),),
            }
        }

    RETURN_TYPES = ("CAMERACTRL_POSES",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl/poses"
    FUNCTION = "load_camera_poses"

    def load_camera_poses(self, pose_filename: str):
        file_path = folder_paths.get_annotated_filepath(pose_filename)
        with open(file_path, 'r') as f:
            poses = f.readlines()
        # first line of file is the link to source, so can be skipped,
        # and the rest is a header-less CSV file separated by single spaces
        poses = [pose.strip().split(' ') for pose in poses[1:]]
        poses = [[float(x) for x in pose] for pose in poses]
        poses = set_original_pose_dims(poses, pose_width=CAM.DEFAULT_POSE_WIDTH, pose_height=CAM.DEFAULT_POSE_HEIGHT)
        return (poses,)