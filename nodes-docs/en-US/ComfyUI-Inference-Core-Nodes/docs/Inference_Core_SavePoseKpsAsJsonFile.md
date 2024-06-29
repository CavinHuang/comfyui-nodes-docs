---
tags:
- Animation
- PoseEstimation
---

# [Inference.Core] Save Pose Keypoints
## Documentation
- Class name: `Inference_Core_SavePoseKpsAsJsonFile`
- Category: `ControlNet Preprocessors/Pose Keypoint Postprocess`
- Output node: `True`

This node is designed to save pose keypoints data as a JSON file, incorporating a filename prefix customization feature. It facilitates the storage of pose keypoints information, enabling further analysis or visualization of pose data.
## Input types
### Required
- **`pose_kps`**
    - The pose keypoints to be saved. This data is crucial for capturing the spatial positions of various body parts in an image.
    - Comfy dtype: `POSE_KEYPOINT`
    - Python dtype: `List[Dict[str, Any]]`
- **`filename_prefix`**
    - An optional prefix for the filename, allowing for easier identification and organization of saved files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
