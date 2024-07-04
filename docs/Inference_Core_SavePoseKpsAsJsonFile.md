
# Documentation
- Class name: Inference_Core_SavePoseKpsAsJsonFile
- Category: ControlNet Preprocessors/Pose Keypoint Postprocess
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在将姿态关键点数据保存为JSON文件，并包含文件名前缀的自定义功能。它能够存储姿态关键点信息，有利于进一步分析或可视化姿态数据。

# Input types
## Required
- pose_kps
    - 需要保存的姿态关键点。这些数据对于捕捉图像中各个身体部位的空间位置至关重要。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict[str, Any]]
- filename_prefix
    - 文件名的可选前缀，便于更容易地识别和组织已保存的文件。
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
