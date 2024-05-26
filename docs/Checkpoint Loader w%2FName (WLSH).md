# Documentation
- Class name: WLSH_Checkpoint_Loader_Model_Name
- Category: WLSH Nodes/loaders
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Checkpoint_Loader_Model_Name节点旨在加载和管理工作流中的检查点。它对于机器学习实验的连续性和可重复性至关重要，确保了保存的模型状态的无缝集成和使用。该节点抽象了检查点检索的复杂性，为模型、CLIP和VAE组件提供了一个直接的接口。

# Input types
## Required
- ckpt_name
    - 'ckpt_name'参数对于识别要加载的特定检查点至关重要。它指导节点到正确的文件路径，对于成功地从保存的检查点恢复模型的状态至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MODEL
    - 'MODEL'输出提供了加载的模型状态，可以用于工作流后续阶段的进一步处理或推断。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 'CLIP'输出提供了检查点中的上下文语言嵌入，便于在应用中实现高级语言模型功能。
    - Comfy dtype: CLIP
    - Python dtype: Any
- VAE
    - 'VAE'输出代表了从检查点检索的变分自编码器组件，这对于涉及生成模型或降维任务至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- modelname
    - 'modelname'输出返回解析后的检查点名称，这对于记录、识别或作为需要模型名称的其他节点的输入非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Checkpoint_Loader_Model_Name:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'modelname')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'WLSH Nodes/loaders'

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        name = self.parse_name(ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        new_out = list(out)
        new_out.pop()
        new_out.append(name)
        out = tuple(new_out)
        return out

    def parse_name(self, ckpt_name):
        path = ckpt_name
        filename = path.split('/')[-1]
        filename = filename.split('.')[:-1]
        filename = '.'.join(filename)
        return filename
```