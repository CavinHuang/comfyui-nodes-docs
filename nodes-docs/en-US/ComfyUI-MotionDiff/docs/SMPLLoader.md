---
tags:
- SMPLModel
---

# SMPL Loader
## Documentation
- Class name: `SMPLLoader`
- Category: `MotionDiff/smpl`
- Output node: `False`

The SMPLLoader node is designed to load and process SMPL model data from specified files, facilitating the integration of SMPL models into motion analysis and synthesis workflows.
## Input types
### Required
- **`smpl`**
    - Specifies the file name of the SMPL model to be loaded. This file contains essential data for motion synthesis, including pose parameters.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`smpl_model`**
    - Determines the specific SMPL model to be used, affecting the interpretation of the loaded SMPL data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`smpl`**
    - Comfy dtype: `SMPL`
    - Outputs a tuple containing the path to the SMPL model, pose parameters (thetas), and metadata, ready for further processing or visualization.
    - Python dtype: `Tuple[str, torch.Tensor, Dict]`
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
