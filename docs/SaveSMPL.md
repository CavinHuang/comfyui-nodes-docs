
# Documentation
- Class name: SaveSMPL
- Category: MotionDiff/smpl
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaveSMPL节点旨在将SMPL模型数据（包括theta值和元数据）保存到指定的输出目录。它支持为文件名添加自定义前缀，并以结构化格式保存数据，便于后续使用或分析。

# Input types
## Required
- smpl
    - 需要保存的SMPL模型数据，包括theta值和元数据，这些对于重建3D模型至关重要。
    - Comfy dtype: SMPL
    - Python dtype: Tuple[torch.Tensor, torch.Tensor, Dict]
- filename_prefix
    - 文件名的前缀，用于帮助组织和轻松识别保存的SMPL模型数据文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveSMPL:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = "_smpl"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "filename_prefix": ("STRING", {"default": "motiondiff_pt"})
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_smpl"

    OUTPUT_NODE = True

    CATEGORY = "MotionDiff/smpl"

    def save_smpl(self, smpl, filename_prefix):
        _, thetas, meta = smpl
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, 196, 24)
        file = f"{filename}_{counter:05}_.pt"
        torch.save({ "thetas": thetas, "meta": meta }, os.path.join(full_output_folder, file))
        return {}

```
