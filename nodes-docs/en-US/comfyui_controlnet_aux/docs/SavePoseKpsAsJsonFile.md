---
tags:
- Animation
- PoseEstimation
---

# Save Pose Keypoints
## Documentation
- Class name: `SavePoseKpsAsJsonFile`
- Category: `ControlNet Preprocessors/Pose Keypoint Postprocess`
- Output node: `True`

This node is designed to save pose keypoints data as a JSON file. It takes pose keypoints and an optional filename prefix as inputs, appending a unique identifier to the filename before saving. This functionality is crucial for persisting pose data for further analysis or processing.
## Input types
### Required
- **`pose_kps`**
    - The pose keypoints to be saved. This data is essential for capturing the spatial positions of various body parts in an image or a sequence of images.
    - Comfy dtype: `POSE_KEYPOINT`
    - Python dtype: `List[Dict]`
- **`filename_prefix`**
    - An optional prefix for the filename under which the pose keypoints will be saved. This allows for easier identification and organization of saved files.
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
