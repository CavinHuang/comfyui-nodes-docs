---
tags:
- SMPLModel
---

# Export Multiple SMPL Subjects toto 3DCGI Software 
## Documentation
- Class name: `Export_SMPLMultipleSubjects_To_3DSoftware`
- Category: `MotionDiff/smpl`
- Output node: `True`

This node is designed to facilitate the export of 3D models of multiple subjects in the SMPL format to various 3D software environments. It aims to streamline the process of integrating complex, multi-subject 3D models into professional 3D CGI applications, enhancing the workflow for 3D animators and visual effects artists.
## Input types
### Required
- **`smpl_multi_subjects`**
    - The dataset containing 3D models of multiple subjects in SMPL format, essential for exporting to 3D software. It plays a critical role in the node's operation by providing the necessary data for processing and conversion.
    - Comfy dtype: `SMPL_MULTIPLE_SUBJECTS`
    - Python dtype: `List[Dict[str, Any]]`
- **`foldername_prefix`**
    - A prefix for the folder name where the exported files will be saved, allowing for organized storage and easy retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`format`**
    - The format in which the 3D models will be exported, such as 'obj', 'fbx', or 'glb', determining the compatibility with various 3D software.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
