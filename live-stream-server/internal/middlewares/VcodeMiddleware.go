/*
generated by comer,https://github.com/imoowi/comer
Copyright © 2023 jun<simpleyuan@gmail.com>
*/
package middlewares

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/imoowi/comer/components"
	"github.com/imoowi/comer/utils/response"
)

func VcodeMiddleware() func(c *gin.Context) {
	return func(c *gin.Context) {
		requestid := c.GetString(`requestid`)
		log.Println(`requestid = `, requestid)

		var postVcode *components.POSTVcode
		err := c.ShouldBindBodyWith(&postVcode, binding.JSON)
		if err != nil {
			response.Error(err.Error(), http.StatusBadRequest, c)
			c.Abort()
			return
		}
		if !components.VerifyCaptcha(postVcode.Id, postVcode.Vcode) {
			response.Error(`验证码验证失败`, http.StatusUnauthorized, c)
			c.Abort()
			return
		}
		c.Next()
	}
}
