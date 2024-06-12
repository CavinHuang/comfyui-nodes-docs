---
tags:
- SMPLModel
---

# Export SMPL to 3DCGI Software
## Documentation
- Class name: `ExportSMPLTo3DSoftware`
- Category: `MotionDiff/smpl`
- Output node: `True`

This node is designed to facilitate the export of SMPL models to 3D software, streamlining the process of integrating these models into various 3D CGI workflows. It abstracts the complexities involved in the conversion and export process, making it easier for users to utilize SMPL models within their preferred 3D environments.
## Input types
### Required
- **`smpl`**
    - The smpl input specifies the SMPL models to be exported. This input is crucial for the node's operation, directly influencing its ability to process and prepare the models for export to 3D software, impacting the overall workflow and output quality.
    - Comfy dtype: `SMPL`
    - Python dtype: `List[str]`
- **`foldername_prefix`**
    - The foldername_prefix input allows users to specify a prefix for the output folder where the exported models will be saved, providing a way to organize the exported files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`format`**
    - The format input determines the file format for the exported models, such as 'glb', allowing users to choose a format that is compatible with their 3D software environments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExportSMPLTo3DSoftware:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = "_smpl"
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "foldername_prefix": ("STRING", {"default": "motiondiff_meshes"}),
                "format": (list(mesh_formats()), {"default": 'glb'})
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_smpl"

    OUTPUT_NODE = True

    CATEGORY = "MotionDiff/smpl"

    def create_trimeshs(self, smpl_model_path, thetas, normalized_to_vertices=False):
        rot2xyz = Rotation2xyz(device=get_torch_device(), smpl_model_path=smpl_model_path)
        faces = rot2xyz.smpl_model.faces
        vertices = rot2xyz(thetas.clone().detach().to(get_torch_device()), mask=None,
                                        pose_rep='xyz' if normalized_to_vertices else 'rot6d', translation=True, glob=True,
                                        jointstype='vertices',
                                        vertstrans=True)
        frames = vertices.shape[3] # shape: 1, nb_frames, 3, nb_joints
        return [Trimesh(vertices=vertices[0, :, :, i].squeeze().tolist(), faces=faces) for i in range(frames)]
    
    def save_smpl(self, smpl, foldername_prefix, format):
        smpl_model_path, thetas, meta = smpl
        foldername_prefix += self.prefix_append
        full_output_folder, foldername, counter, subfolder, foldername_prefix = folder_paths.get_save_image_path(foldername_prefix, self.output_dir, 196, 24)
        folder = os.path.join(full_output_folder, f"{foldername}_{counter:05}_")
        os.makedirs(folder, exist_ok=True)
        trimeshs = self.create_trimeshs(smpl_model_path, thetas, normalized_to_vertices=meta.get("normalized_to_vertices", False))
        for i, trimesh in enumerate(trimeshs):
            trimesh.export(os.path.join(folder, f'{i}.{format}'))
        return {}

```
