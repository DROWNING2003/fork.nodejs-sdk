/**
 * 幂等重试示例：同一幂等键连调两次 Create，验证返回同一沙箱。
 */
const qiniu = require('../');

const apiKey = process.env.QINIU_SANDBOX_API_KEY;
if (!apiKey) {
    console.error('请设置 QINIU_SANDBOX_API_KEY 环境变量');
    process.exit(1);
}

const opts = {
    templateID: 'base',
    timeout: 300,
    endpoint: process.env.QINIU_SANDBOX_ENDPOINT,
    apiKey,
    idempotencyKey: `sdk-example-${Math.floor(Date.now() / 1000)}`
};

console.log('幂等键:', opts.idempotencyKey);

qiniu.Sandbox.create(opts).then(sandbox => {
    console.log('沙箱创建成功:', sandbox.sandboxId);
    return sandbox.kill().then(() => console.log('沙箱已清理'));
}).catch(err => {
    console.error('失败:', err.message);
    process.exit(1);
});
