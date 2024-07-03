
# Documentation
- Class name: SavePoseKpsAsJsonFile
- Category: ControlNet Preprocessors/Pose Keypoint Postprocess
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SavePoseKpsAsJsonFile节点用于将姿势关键点数据保存为JSON文件。它接收姿势关键点数据和可选的文件名前缀作为输入，在保存前会为文件名添加一个唯一标识符。这个功能对于持久化存储姿势数据以供进一步分析或处理非常重要。

# Input types
## Required
- pose_kps
    - 需要保存的姿势关键点数据。这些数据对于捕捉图像或图像序列中各个身体部位的空间位置至关重要。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict]
- filename_prefix
    - 用于保存姿势关键点文件的可选文件名前缀。这有助于更容易地识别和组织已保存的文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SavePoseKpsAsJsonFile:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pose_kps": ("POSE_KEYPOINT",),
                "filename_prefix": ("STRING", {"default": "PoseKeypoint"})
            }
        }
    RETURN_TYPES = ()
    FUNCTION = "save_pose_kps"
    OUTPUT_NODE = True
    CATEGORY = "ControlNet Preprocessors/Pose Keypoint Postprocess"
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""
    def save_pose_kps(self, pose_kps, filename_prefix):
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = \
            folder_paths.get_save_image_path(filename_prefix, self.output_dir, pose_kps[0]["canvas_width"], pose_kps[0]["canvas_height"])
        file = f"{filename}_{counter:05}.json"
        with open(os.path.join(full_output_folder, file), 'w') as f:
            json.dump(pose_kps , f)
        return {}

```
