
# Documentation
- Class name: ExportSMPLTo3DSoftware
- Category: MotionDiff/smpl
- Output node: True

ExportSMPLTo3DSoftware节点旨在简化SMPL模型到3D软件的导出过程，为用户在各种3D CGI工作流中集成这些模型提供便利。它抽象了转换和导出过程中的复杂性，使用户能够更轻松地在自己偏好的3D环境中使用SMPL模型。

# Input types
## Required
- smpl
    - smpl输入指定了要导出的SMPL模型。这个输入对节点的运行至关重要，直接影响其处理和准备模型以导出到3D软件的能力，从而影响整个工作流程和输出质量。
    - Comfy dtype: SMPL
    - Python dtype: List[str]
- foldername_prefix
    - foldername_prefix输入允许用户为存储导出模型的输出文件夹指定前缀，提供了一种组织导出文件的方式。
    - Comfy dtype: STRING
    - Python dtype: str
- format
    - format输入决定了导出模型的文件格式，例如'glb'，允许用户选择与其3D软件环境兼容的格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
该节点没有输出类型


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
