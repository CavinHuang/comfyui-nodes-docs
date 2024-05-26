# Documentation
- Class name: TripoSRViewer
- Category: Flowty TripoSR
- Output node: True
- Repo Ref: https://github.com/flowtyone/ComfyUI-Flowty-TripoSR

TripoSRViewer类的display方法旨在可视化和导出3D网格。它通过一系列变换处理输入网格以准备其进行可视化，并将修改后的网格保存在指定的目录结构中。该方法增强了用户审查和分析3D渲染任务输出的能力，有助于3D模型操作和评估的整体工作流程。

# Input types
## Required
- mesh
    - mesh参数对于display方法至关重要，它代表了需要可视化和导出的3D模型。它通过确定将要处理和显示的对象直接影响节点执行的结果。网格的质量和属性影响最终的可视化和导出文件，使其成为节点操作的关键组成部分。
    - Comfy dtype: MESH
    - Python dtype: torch_geometric.data.Batch

# Output types
- mesh
    - 输出网格参数代表了display方法执行后修改并保存的3D模型。它之所以重要，是因为它为用户提供了可视化过程的有形成果，允许进行进一步分析或在下游应用中使用。输出网格作为3D模型操作链中的关键环节，展示了所应用变换的有效性。
    - Comfy dtype: MESH
    - Python dtype: List[Dict[str, Union[str, int, List[str]]]]

# Usage tips
- Infra type: CPU

# Source code
```
class TripoSRViewer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mesh': ('MESH',)}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = 'display'
    CATEGORY = 'Flowty TripoSR'

    def display(self, mesh):
        saved = list()
        (full_output_folder, filename, counter, subfolder, filename_prefix) = get_save_image_path('meshsave', get_output_directory())
        for (batch_number, single_mesh) in enumerate(mesh):
            filename_with_batch_num = filename.replace('%batch_num%', str(batch_number))
            file = f'{filename_with_batch_num}_{counter:05}_.obj'
            single_mesh.apply_transform(np.array([[1, 0, 0, 0], [0, 0, 1, 0], [0, -1, 0, 0], [0, 0, 0, 1]]))
            single_mesh.export(path.join(full_output_folder, file))
            saved.append({'filename': file, 'type': 'output', 'subfolder': subfolder})
        return {'ui': {'mesh': saved}}
```