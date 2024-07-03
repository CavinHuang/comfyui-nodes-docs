
# Documentation
- Class name: `Export_SMPLMultipleSubjects_To_3DSoftware`
- Category: `MotionDiff/smpl`
- Output node: `True`

该节点旨在简化将多个主体的SMPL格式3D模型导出到各种3D软件环境的过程。它的目标是优化复杂的多主体3D模型集成到专业3D CGI应用程序的工作流程，从而提高3D动画师和视觉特效艺术家的工作效率。

# Input types
## Required
- smpl_multi_subjects
    - 包含多个主体SMPL格式3D模型的数据集，是导出到3D软件的关键。它通过提供处理和转换所需的数据，在节点操作中发挥着至关重要的作用。
    - Comfy dtype: SMPL_MULTIPLE_SUBJECTS
    - Python dtype: List[Dict[str, Any]]
- foldername_prefix
    - 用于存储导出文件的文件夹名称的前缀，便于组织存储和轻松检索。
    - Comfy dtype: STRING
    - Python dtype: str
- format
    - 3D模型将被导出的格式，如'obj'、'fbx'或'glb'，决定了与各种3D软件的兼容性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Export_SMPLMultipleSubjects_To_3DSoftware:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = "_smpl"
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl_multi_subjects": ("SMPL_MULTIPLE_SUBJECTS", ),
                "foldername_prefix": ("STRING", {"default": "4dhuman_meshes"}),
                "format": (list(mesh_formats()), {"default": 'glb'})
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_smpl"

    OUTPUT_NODE = True

    CATEGORY = "MotionDiff/smpl"
    
    def save_smpl(self, smpl_multi_subjects, foldername_prefix, format):
        import json, trimesh
        foldername_prefix += self.prefix_append
        full_output_folder, foldername, counter, subfolder, foldername_prefix = folder_paths.get_save_image_path(foldername_prefix, self.output_dir, 196, 24)
        folder = os.path.join(full_output_folder, f"{foldername}_{counter:05}_")
        os.makedirs(folder, exist_ok=True)

        verts_frames, meta = smpl_multi_subjects
        focal_length, frame_width, frame_height = meta["focal_length"], meta["frame_width"], meta["frame_height"]
        
        pbar = comfy.utils.ProgressBar(len(verts_frames))
        for i in tqdm(range(len(verts_frames))):
            frame_dir = os.path.join(folder, f'frame_{i:05}')
            os.makedirs(frame_dir, exist_ok=True)
            subjects = verts_frames[i]
            if subjects is None:
                continue
            for j, (subject_vertices) in enumerate(subjects):
                mesh = trimesh.Trimesh(subject_vertices, faces=meta["faces"])
                mesh.export(os.path.join(frame_dir, f'subject_{j}.{format}'))
            with open(os.path.join(frame_dir, "camera_intrinsics.json"), 'w') as f:
                json.dump(dict(fx=focal_length.item(), fy=focal_length.item(), cx=meta.get('cx', frame_width / 2), cy=meta.get('cy', frame_height / 2), zfar="1e12"), f)
            pbar.update(1)
        return {}

```
