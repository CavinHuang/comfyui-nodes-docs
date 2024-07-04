
# Documentation
- Class name: SMPLLoader
- Category: MotionDiff/smpl
- Output node: False

SMPLLoader节点旨在从指定文件加载和处理SMPL模型数据，便于将SMPL模型集成到运动分析和合成工作流程中。

# Input types
## Required
- smpl
    - 指定要加载的SMPL模型文件名。该文件包含运动合成所需的关键数据，如姿势参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- smpl_model
    - 确定要使用的具体SMPL模型，影响加载的SMPL数据的解释方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- smpl
    - 输出一个元组，包含SMPL模型的路径、姿势参数（thetas）和元数据，可供进一步处理或可视化。
    - Comfy dtype: SMPL
    - Python dtype: Tuple[str, torch.Tensor, Dict]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SMPLLoader:
    @classmethod
    def INPUT_TYPES(s):
        global smpl_model_dicts
        smpl_model_dicts = get_smpl_models_dict()
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        files = folder_paths.filter_files_extensions(files, ['.pt'])
        return {
            "required": {
                "smpl": (files, ),
                "smpl_model": (list(smpl_model_dicts.keys()), {"default": "SMPL_NEUTRAL.pkl"})
            }
        }
    
    RETURN_TYPES = ("SMPL", )
    FUNCTION = "load_smpl"
    CATEGORY = "MotionDiff/smpl"

    def load_smpl(self, smpl, smpl_model):
        input_dir = folder_paths.get_input_directory()
        smpl_dict = torch.load(os.path.join(input_dir, smpl))
        thetas, meta = smpl_dict["thetas"], smpl_dict["meta"]
        global smpl_model_dicts
        if smpl_model_dicts is None:
            smpl_model_dicts = get_smpl_models_dict()
        smpl_model_path = smpl_model_dicts[smpl_model]

        return ((smpl_model_path, thetas, meta), )

```
