import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import SignInForm from '../forms/SignInForm.jsx'
import SignUpForm from '../forms/SignUpForm.jsx'
import { useThirdParty } from '../auth/authActions.jsx'

const active = 'btn btn-outline-dark btn-lg rounded-0 w-50 font-weight-bold active'
const notActive = 'btn btn-outline-dark btn-lg rounded-0 w-50 font-weight-bold'
const mapState = (state) => ({
  loading: state.async.loading,
  fbp: state.firebase.profile,
  fba: state.firebase.auth,  
  auth: state.auth
})

const actions = {
  useThirdParty
}

class LandingPage extends Component {
  state = {
    username_err_msg: false,
    defaultOpts: true,
  }
  isEmptyUsername = (username) => {
    username.trim().length == 0
    ? this.setState({
        username_err_msg: true
      })  
    : this.setState({
        username_err_msg: false
      })  
  }  
  hendledefaultOpts = () => {
    this.setState(prevState => ({
      defaultOpts: !prevState.defaultOpts
    }))
    this.setState({
      username_err_msg: false
    })  
    this.props.auth.signupError = null
    this.props.auth.loginError = null    
  }
  handleSignOut = () => {
    this.props.firebase.logout()
  }
  render() {
    const {loading, fbp, fba, auth, useThirdParty} = this.props
    const authenticated = fba.isLoaded && !fba.isEmpty
    return (
      <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4 pb-5 px-0'>
          <div className='mx-3'>
            <img className="logo mb-2" src="/static/images/_logo.png"/>
            <h4 className='mb-4 ml-5 pl-5 font-italic font-weight-bold'>Let's Meet Up!</h4>
          </div>
          {
            !authenticated &&
            <div className='card border-dark rounded-0'>
              <div className='card-header border-dark bg-white font-weight-bold p-0'>
                <button 
                  type="button" 
                  class={ this.state.defaultOpts ? notActive : active }
                  onClick={this.hendledefaultOpts}
                >
                  Sign up
                </button>
                <button 
                  type="button" 
                  class={ this.state.defaultOpts ? active : notActive }
                  onClick={this.hendledefaultOpts}                
                >
                  Log in
                </button>
              </div>
              <div className='card-body transbox'>
                { 
                  this.state.defaultOpts 
                  ? <SignInForm/> 
                  : <SignUpForm loading={loading} isEmptyUsername={this.isEmptyUsername}/> 
                }
                {
                  !this.state.defaultOpts && this.state.username_err_msg &&
                  <h6 className='input-err-msg mb-3 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    Username is required.
                  </h6>          
                }
                {
                  !this.state.defaultOpts && auth.signupError &&
                  <h6 className='input-err-msg mb-3 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {auth.signupError.message}
                  </h6>
                }          
                {
                  this.state.defaultOpts && auth.loginError &&
                  <h6 className='input-err-msg mb-3 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {auth.loginError.message}
                  </h6>
                }                
                <hr class="hr-text" data-content="Or Continue With"/>
                <button 
                  onClick={() => useThirdParty('facebook')}
                  type='button' 
                  className='btn btn-lg rounded-0 p-0 social-block facebook-btn mr-2'
                  >
                  <img className='attendee' src='/static/images/facebook-icon.png'/>
                </button>
                <button 
                  onClick={() => useThirdParty('google')}
                  type='button' 
                  className='btn btn-lg rounded-0 p-0 social-block google-btn mr-2'
                  >
                  <img className='attendee' src='/static/images/google-icon.jpg'/>
                </button>
                <button 
                  onClick={() => useThirdParty('twitter')}                                  
                  type='button' 
                  className='btn btn-lg rounded-0 p-0 social-block twitter-btn mr-2'
                  >
                  <img className='attendee' src='/static/images/twitter-icon.png'/>
                </button>
                <button 
                  onClick={() => useThirdParty('github')}                                                                    
                  type='button' 
                  className='btn btn-lg rounded-0 p-0 social-block github-btn mr-2'
                  >
                  <img className='attendee' src='/static/images/github-icon.png'/>
                </button>
                <a 
                  role="button" 
                  class="btn btn-outline-light l-btn wl-btn btn-lg rounded-0 font-weight-bold py-1 px-2 signout"
                  href={`/search/${fba.uid}`}
                >
                  <i class="fas fa-user"></i>
                </a>
                {
                  !authenticated && auth.useThirdPartyError &&
                  <h6 className='input-err-msg mt-3 mb-0 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {auth.useThirdPartyError.message}
                  </h6>              
                }
              </div>
            </div>
          }
          {
            authenticated &&
            <h6 className='pl-4 font-italic font-weight-bold l-msg'>
              Sup? <a href={`/profile/${fba.uid}`}>{fbp.displayName}</a>
            </h6>
          }
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href={`/search/${fba.uid}`}
              >
              <i class="fas fa-search icon text-center mr-4"></i>Search           
            </a>
          }
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href='/trending'            
              >
              <i class="fas fa-chart-line icon text-center mr-4"></i>Trending           
            </a>
          }
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href={`/profile/${fba.uid}`}
            >
              <i class="fas fa-address-card icon text-center mr-4"></i>Profile           
            </a>
          }         
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href='/create'
            >
              <i class="fas fa-plus icon text-center mr-4"></i>Create           
            </a>
          }
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href='/settings'
            >
              <i class="fas fa-wrench icon text-center mr-4"></i>Settings           
            </a>
          }          
          {
            authenticated &&
            <a 
              role="button" 
              class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
              href='#'
              onClick={this.handleSignOut}
            >
              <img
                src={fbp.avatarUrl || "/static/images/whazup-square-logo.png"}
                class="rounded-circle icon mr-4"
                alt="..."
              />
              Sign out           
            </a>
          }          
          <div className='mx-3'>
            <hr/>
            <small className='font-weight-bold'>
              <i class="far fa-copyright mr-2"></i>2019 Metafries
            </small>
          </div>
        </div>
        <div className='col-lg-4'></div>
      </div>
    )
  }
}

export default withFirebase(connect(mapState, actions)(LandingPage))
