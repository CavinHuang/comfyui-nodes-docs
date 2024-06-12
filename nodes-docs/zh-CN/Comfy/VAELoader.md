# Documentation
- Class name: VAELoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAELoader节点旨在管理变分自编码器（VAE）模型的加载和准备。它抽象了处理不同VAE配置的复杂性，并为访问这些模型提供了统一的接口。节点的功能集中在列出可用的VAE、根据它们的名称加载它们，并确保它们被正确初始化并准备好用于下游任务。

# Input types
## Required
- vae_name
    - 参数'vae_name'对于识别要加载的特定VAE模型至关重要。它通过确定将使用哪个模型配置和权重来影响节点的执行。此参数对于确保为后续处理步骤准备正确的模型至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- VAE
    - 输出参数'VAE'代表已加载的变分自编码器模型。它非常重要，因为它是节点的主要输出，封装了模型的配置和学习到的参数。此输出允许在进一步的分析或生成任务中使用模型。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Usage tips
- Infra type: CPU

# Source code
```
class VAELoader:

    @staticmethod
    def vae_list():
        vaes = folder_paths.get_filename_list('vae')
        approx_vaes = folder_paths.get_filename_list('vae_approx')
        sdxl_taesd_enc = False
        sdxl_taesd_dec = False
        sd1_taesd_enc = False
        sd1_taesd_dec = False
        for v in approx_vaes:
            if v.startswith('taesd_decoder.'):
                sd1_taesd_dec = True
            elif v.startswith('taesd_encoder.'):
                sd1_taesd_enc = True
            elif v.startswith('taesdxl_decoder.'):
                sdxl_taesd_dec = True
            elif v.startswith('taesdxl_encoder.'):
                sdxl_taesd_enc = True
        if sd1_taesd_dec and sd1_taesd_enc:
            vaes.append('taesd')
        if sdxl_taesd_dec and sdxl_taesd_enc:
            vaes.append('taesdxl')
        return vaes

    @staticmethod
    def load_taesd(name):
        sd = {}
        approx_vaes = folder_paths.get_filename_list('vae_approx')
        encoder = next(filter(lambda a: a.startswith('{}_encoder.'.format(name)), approx_vaes))
        decoder = next(filter(lambda a: a.startswith('{}_decoder.'.format(name)), approx_vaes))
        enc = comfy.utils.load_torch_file(folder_paths.get_full_path('vae_approx', encoder))
        for k in enc:
            sd['taesd_encoder.{}'.format(k)] = enc[k]
        dec = comfy.utils.load_torch_file(folder_paths.get_full_path('vae_approx', decoder))
        for k in dec:
            sd['taesd_decoder.{}'.format(k)] = dec[k]
        if name == 'taesd':
            sd['vae_scale'] = torch.tensor(0.18215)
        elif name == 'taesdxl':
            sd['vae_scale'] = torch.tensor(0.13025)
        return sd

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'vae_name': (s.vae_list(),)}}
    RETURN_TYPES = ('VAE',)
    FUNCTION = 'load_vae'
    CATEGORY = 'loaders'

    def load_vae(self, vae_name):
        if vae_name in ['taesd', 'taesdxl']:
            sd = self.load_taesd(vae_name)
        else:
            vae_path = folder_paths.get_full_path('vae', vae_name)
            sd = comfy.utils.load_torch_file(vae_path)
        vae = comfy.sd.VAE(sd=sd)
        return (vae,)
```