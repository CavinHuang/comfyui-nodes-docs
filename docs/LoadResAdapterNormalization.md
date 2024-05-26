# Documentation
- Class name: LoadResAdapterNormalization
- Category: KJNodes/experimental
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

方法 `load_res_adapter` 旨在将 ResAdapter 标准化权重集成到给定模型中。它确保从指定路径正确加载权重并将其应用于模型的标准化层，增强了模型处理具有标准化特征的输入数据的能力。

# Input types
## Required
- model
    - 参数 'model' 是必需的，因为它代表了将要应用 ResAdapter 标准化权重的机器学习模型。它是一个关键组件，决定了节点的功能和标准化过程的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- resadapter_path
    - 参数 'resadapter_path' 指定了存储 ResAdapter 标准化权重的目录路径。对于节点来说，找到并加载正确的权重至关重要，以确保成功地将标准化应用于模型。
    - Comfy dtype: folder_paths.get_filename_list('checkpoints')
    - Python dtype: List[str]

# Output types
- model_clone
    - 输出 'model_clone' 是应用了 ResAdapter 标准化权重的原始模型。它标志权重成功集成，允许模型使用标准化特性以改进数据处理。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LoadResAdapterNormalization:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'resadapter_path': (folder_paths.get_filename_list('checkpoints'),)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'load_res_adapter'
    CATEGORY = 'KJNodes/experimental'

    def load_res_adapter(self, model, resadapter_path):
        print('ResAdapter: Checking ResAdapter path')
        resadapter_full_path = folder_paths.get_full_path('checkpoints', resadapter_path)
        if not os.path.exists(resadapter_full_path):
            raise Exception('Invalid model path')
        else:
            print('ResAdapter: Loading ResAdapter normalization weights')
            prefix_to_remove = 'diffusion_model.'
            model_clone = model.clone()
            norm_state_dict = comfy.utils.load_torch_file(resadapter_full_path)
            new_values = {key[len(prefix_to_remove):]: value for (key, value) in norm_state_dict.items() if key.startswith(prefix_to_remove)}
            print('ResAdapter: Attempting to add patches with ResAdapter weights')
            try:
                for key in model.model.diffusion_model.state_dict().keys():
                    if key in new_values:
                        original_tensor = model.model.diffusion_model.state_dict()[key]
                        new_tensor = new_values[key].to(model.model.diffusion_model.dtype)
                        if original_tensor.shape == new_tensor.shape:
                            model_clone.add_object_patch(f'diffusion_model.{key}.data', new_tensor)
                        else:
                            print('ResAdapter: No match for key: ', key)
            except:
                raise Exception('Could not patch model, this way of patching was added to ComfyUI on March 3rd 2024, is your ComfyUI up to date?')
            print('ResAdapter: Added resnet normalization patches')
            return (model_clone,)
```