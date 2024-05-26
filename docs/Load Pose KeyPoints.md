# Documentation
- Class name: LoadPoseKeyPoints
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点旨在从指定文件中检索和解析姿态关键点数据，便于在系统中分析和处理人体姿态信息。

# Input types
## Required
- file_name
    - file_name参数至关重要，因为它标识了节点将要处理的姿态关键点数据所在的特定文件。
    - Comfy dtype: COMBO[(os.listdir(folder_paths.output_directory), {'default': 'PoseKeypoint_00001.json'})]
    - Python dtype: Union[str, None]

# Output types
- POSE_KEYPOINT
    - 输出提供了姿态关键点数据的结构化表示，使得在系统中能够进行进一步的处理和分析。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class LoadPoseKeyPoints:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'file_name': (os.listdir(folder_paths.output_directory), {'default': 'PoseKeypoint_00001.json'})}}
    RETURN_TYPES = ('POSE_KEYPOINT',)
    FUNCTION = 'run'
    CATEGORY = 'DragNUWA'

    def run(self, file_name):
        path = os.path.join(folder_paths.output_directory, file_name)
        with open(path) as fr:
            return (json.load(fr),)
```